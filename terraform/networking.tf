# Joynt Platform - Networking Infrastructure
# VPC, Subnets, Security Groups, and Network ACLs

# VPC
resource "aws_vpc" "joynt_vpc" {
  cidr_block           = local.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(local.common_tags, {
    Name                                        = "${local.cluster_name}-vpc"
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "joynt_igw" {
  vpc_id = aws_vpc.joynt_vpc.id

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-igw"
  })
}

# Public Subnets
resource "aws_subnet" "public" {
  count = length(local.azs)

  vpc_id                  = aws_vpc.joynt_vpc.id
  cidr_block              = cidrsubnet(local.vpc_cidr, 8, count.index)
  availability_zone       = local.azs[count.index]
  map_public_ip_on_launch = true

  tags = merge(local.common_tags, {
    Name                                        = "${local.cluster_name}-public-${local.azs[count.index]}"
    "kubernetes.io/role/elb"                   = "1"
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
  })
}

# Private Subnets for Applications
resource "aws_subnet" "private" {
  count = length(local.azs)

  vpc_id            = aws_vpc.joynt_vpc.id
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, count.index + 10)
  availability_zone = local.azs[count.index]

  tags = merge(local.common_tags, {
    Name                                        = "${local.cluster_name}-private-${local.azs[count.index]}"
    "kubernetes.io/role/internal-elb"          = "1"
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
  })
}

# Database Subnets
resource "aws_subnet" "database" {
  count = length(local.azs)

  vpc_id            = aws_vpc.joynt_vpc.id
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, count.index + 20)
  availability_zone = local.azs[count.index]

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-database-${local.azs[count.index]}"
    Type = "Database"
  })
}

# NAT Gateways
resource "aws_eip" "nat" {
  count = length(local.azs)

  domain = "vpc"
  
  depends_on = [aws_internet_gateway.joynt_igw]

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-nat-eip-${local.azs[count.index]}"
  })
}

resource "aws_nat_gateway" "nat" {
  count = length(local.azs)

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  depends_on = [aws_internet_gateway.joynt_igw]

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-nat-${local.azs[count.index]}"
  })
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.joynt_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.joynt_igw.id
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-public-rt"
  })
}

resource "aws_route_table" "private" {
  count = length(local.azs)

  vpc_id = aws_vpc.joynt_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat[count.index].id
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-private-rt-${local.azs[count.index]}"
  })
}

resource "aws_route_table" "database" {
  count = length(local.azs)

  vpc_id = aws_vpc.joynt_vpc.id

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-database-rt-${local.azs[count.index]}"
  })
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = length(aws_subnet.private)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

resource "aws_route_table_association" "database" {
  count = length(aws_subnet.database)

  subnet_id      = aws_subnet.database[count.index].id
  route_table_id = aws_route_table.database[count.index].id
}

# VPC Endpoints for AWS Services
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.joynt_vpc.id
  service_name = "com.amazonaws.${var.aws_region}.s3"
  
  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-s3-endpoint"
  })
}

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id       = aws_vpc.joynt_vpc.id
  service_name = "com.amazonaws.${var.aws_region}.dynamodb"
  
  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-dynamodb-endpoint"
  })
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = aws_vpc.joynt_vpc.id
  service_name        = "com.amazonaws.${var.aws_region}.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  
  private_dns_enabled = true
  
  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-ecr-api-endpoint"
  })
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = aws_vpc.joynt_vpc.id
  service_name        = "com.amazonaws.${var.aws_region}.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  
  private_dns_enabled = true
  
  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-ecr-dkr-endpoint"
  })
}

# Security Groups
resource "aws_security_group" "eks_cluster" {
  name        = "${local.cluster_name}-cluster-sg"
  description = "Security group for EKS cluster"
  vpc_id      = aws_vpc.joynt_vpc.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-cluster-sg"
  })
}

resource "aws_security_group" "eks_nodes" {
  name        = "${local.cluster_name}-nodes-sg"
  description = "Security group for EKS worker nodes"
  vpc_id      = aws_vpc.joynt_vpc.id

  ingress {
    from_port = 0
    to_port   = 65535
    protocol  = "tcp"
    self      = true
  }

  ingress {
    from_port       = 1025
    to_port         = 65535
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_cluster.id]
  }

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_cluster.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-nodes-sg"
  })
}

resource "aws_security_group" "rds" {
  name        = "${local.cluster_name}-rds-sg"
  description = "Security group for RDS database"
  vpc_id      = aws_vpc.joynt_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-rds-sg"
  })
}

resource "aws_security_group" "redis" {
  name        = "${local.cluster_name}-redis-sg"
  description = "Security group for Redis cluster"
  vpc_id      = aws_vpc.joynt_vpc.id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-redis-sg"
  })
}

resource "aws_security_group" "alb" {
  name        = "${local.cluster_name}-alb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id      = aws_vpc.joynt_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-alb-sg"
  })
}

resource "aws_security_group" "vpc_endpoints" {
  name        = "${local.cluster_name}-vpc-endpoints-sg"
  description = "Security group for VPC endpoints"
  vpc_id      = aws_vpc.joynt_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [local.vpc_cidr]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-vpc-endpoints-sg"
  })
}

# Network ACLs for additional security
resource "aws_network_acl" "database" {
  vpc_id     = aws_vpc.joynt_vpc.id
  subnet_ids = aws_subnet.database[*].id

  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = local.vpc_cidr
    from_port  = 5432
    to_port    = 5432
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 110
    action     = "allow"
    cidr_block = local.vpc_cidr
    from_port  = 6379
    to_port    = 6379
  }

  egress {
    protocol   = "-1"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-database-nacl"
  })
}