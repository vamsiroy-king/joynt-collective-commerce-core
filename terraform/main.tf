# Joynt Platform - Complete Infrastructure as Code
# Advanced Terraform configuration for scalable group buying platform

terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "joynt-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Joynt"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Platform-Team"
    }
  }
}

# Data sources for existing resources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Local values for common configurations
locals {
  cluster_name = "joynt-${var.environment}"
  
  # Networking
  vpc_cidr = "10.0.0.0/16"
  azs      = slice(data.aws_availability_zones.available.names, 0, 3)
  
  # Common tags
  common_tags = {
    Project      = "Joynt"
    Environment  = var.environment
    ManagedBy    = "Terraform"
    ClusterName  = local.cluster_name
  }

  # Database configurations
  rds_instance_class = var.environment == "production" ? "db.r6g.xlarge" : "db.t3.medium"
  redis_node_type    = var.environment == "production" ? "cache.r6g.large" : "cache.t3.micro"
  
  # EKS configurations
  eks_version = "1.28"
  
  # Node group configurations
  node_groups = {
    general = {
      instance_types = ["m6i.large", "m6i.xlarge"]
      capacity_type  = "ON_DEMAND"
      min_size       = 3
      max_size       = 50
      desired_size   = 6
    }
    spot = {
      instance_types = ["m6i.large", "m5.large", "m5a.large"]
      capacity_type  = "SPOT"
      min_size       = 0
      max_size       = 100
      desired_size   = 10
    }
    ai_gpu = {
      instance_types = ["g4dn.xlarge", "g4dn.2xlarge"]
      capacity_type  = "ON_DEMAND"
      min_size       = 0
      max_size       = 10
      desired_size   = 2
      taints = [
        {
          key    = "nvidia.com/gpu"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      ]
    }
  }
}

# Random password for database
resource "random_password" "db_password" {
  length  = 16
  special = true
}

# Random password for Redis
resource "random_password" "redis_password" {
  length  = 32
  special = false
}

# KMS Key for encryption
resource "aws_kms_key" "joynt_key" {
  description             = "KMS key for Joynt platform encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-kms-key"
  })
}

resource "aws_kms_alias" "joynt_key_alias" {
  name          = "alias/${local.cluster_name}-key"
  target_key_id = aws_kms_key.joynt_key.key_id
}

# S3 Bucket for application assets
resource "aws_s3_bucket" "joynt_assets" {
  bucket = "joynt-${var.environment}-assets-${random_id.bucket_suffix.hex}"

  tags = merge(local.common_tags, {
    Name = "Joynt Assets Bucket"
  })
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket_versioning" "joynt_assets_versioning" {
  bucket = aws_s3_bucket.joynt_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "joynt_assets_encryption" {
  bucket = aws_s3_bucket.joynt_assets.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.joynt_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "joynt_assets_pab" {
  bucket = aws_s3_bucket.joynt_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "joynt_cdn" {
  origin {
    domain_name = aws_s3_bucket.joynt_assets.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.joynt_assets.bucket}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.joynt_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Joynt Platform CDN"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.joynt_assets.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = local.common_tags
}

resource "aws_cloudfront_origin_access_identity" "joynt_oai" {
  comment = "OAI for Joynt assets bucket"
}