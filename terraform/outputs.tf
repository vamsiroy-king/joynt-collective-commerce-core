# Joynt Platform - Terraform Outputs
# Key infrastructure outputs for application deployment

# Cluster Information
output "cluster_name" {
  description = "Name of the EKS cluster"
  value       = aws_eks_cluster.joynt_cluster.name
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = aws_eks_cluster.joynt_cluster.endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = aws_eks_cluster.joynt_cluster.vpc_config[0].cluster_security_group_id
}

output "cluster_iam_role_arn" {
  description = "IAM role ARN of the EKS cluster"
  value       = aws_eks_cluster.joynt_cluster.role_arn
}

output "cluster_certificate_authority_data" {
  description = "Base64 encoded certificate data required to communicate with the cluster"
  value       = aws_eks_cluster.joynt_cluster.certificate_authority[0].data
}

output "cluster_version" {
  description = "The Kubernetes version for the EKS cluster"
  value       = aws_eks_cluster.joynt_cluster.version
}

output "cluster_oidc_issuer_url" {
  description = "The URL on the EKS cluster OIDC Issuer"
  value       = aws_eks_cluster.joynt_cluster.identity[0].oidc[0].issuer
}

# Networking
output "vpc_id" {
  description = "ID of the VPC where the cluster is deployed"
  value       = aws_vpc.joynt_vpc.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.joynt_vpc.cidr_block
}

output "public_subnet_ids" {
  description = "List of IDs of public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "List of IDs of private subnets"
  value       = aws_subnet.private[*].id
}

output "database_subnet_ids" {
  description = "List of IDs of database subnets"
  value       = aws_subnet.database[*].id
}

# Database
output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.joynt_primary.endpoint
  sensitive   = true
}

output "database_port" {
  description = "RDS instance port"
  value       = aws_db_instance.joynt_primary.port
}

output "database_name" {
  description = "RDS database name"
  value       = aws_db_instance.joynt_primary.db_name
}

output "database_username" {
  description = "RDS database username"
  value       = aws_db_instance.joynt_primary.username
  sensitive   = true
}

output "database_replica_endpoints" {
  description = "RDS read replica endpoints"
  value       = aws_db_instance.joynt_replica[*].endpoint
  sensitive   = true
}

# Redis
output "redis_primary_endpoint" {
  description = "Redis primary endpoint"
  value       = aws_elasticache_replication_group.joynt_redis.primary_endpoint_address
  sensitive   = true
}

output "redis_reader_endpoint" {
  description = "Redis reader endpoint"
  value       = aws_elasticache_replication_group.joynt_redis.reader_endpoint_address
  sensitive   = true
}

output "redis_port" {
  description = "Redis port"
  value       = aws_elasticache_replication_group.joynt_redis.port
}

# Storage
output "s3_bucket_name" {
  description = "Name of the S3 bucket for assets"
  value       = aws_s3_bucket.joynt_assets.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket for assets"
  value       = aws_s3_bucket.joynt_assets.arn
}

output "s3_bucket_domain_name" {
  description = "Bucket domain name for S3 bucket"
  value       = aws_s3_bucket.joynt_assets.bucket_domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.joynt_cdn.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.joynt_cdn.domain_name
}

# Security
output "kms_key_id" {
  description = "The KMS key ID used for encryption"
  value       = aws_kms_key.joynt_key.key_id
}

output "kms_key_arn" {
  description = "The KMS key ARN used for encryption"
  value       = aws_kms_key.joynt_key.arn
}

# Secrets Manager
output "database_secret_arn" {
  description = "ARN of the database credentials secret"
  value       = aws_secretsmanager_secret.database_credentials.arn
  sensitive   = true
}

output "redis_secret_arn" {
  description = "ARN of the Redis credentials secret"
  value       = aws_secretsmanager_secret.redis_credentials.arn
  sensitive   = true
}

output "app_secrets_arn" {
  description = "ARN of the application secrets"
  value       = aws_secretsmanager_secret.app_secrets.arn
  sensitive   = true
}

# IAM Roles for Service Accounts
output "load_balancer_controller_role_arn" {
  description = "ARN of the Load Balancer Controller IAM role"
  value       = aws_iam_role.load_balancer_controller.arn
}

output "cluster_autoscaler_role_arn" {
  description = "ARN of the Cluster Autoscaler IAM role"
  value       = aws_iam_role.cluster_autoscaler.arn
}

output "app_role_arn" {
  description = "ARN of the application IAM role"
  value       = aws_iam_role.joynt_app.arn
}

output "ebs_csi_role_arn" {
  description = "ARN of the EBS CSI driver IAM role"
  value       = aws_iam_role.ebs_csi.arn
}

output "vpc_cni_role_arn" {
  description = "ARN of the VPC CNI IAM role"
  value       = aws_iam_role.vpc_cni.arn
}

# Node Groups
output "node_group_arns" {
  description = "ARNs of the EKS node groups"
  value       = { for k, v in aws_eks_node_group.joynt_nodes : k => v.arn }
}

output "node_group_status" {
  description = "Status of the EKS node groups"
  value       = { for k, v in aws_eks_node_group.joynt_nodes : k => v.status }
}

# Environment Information
output "environment" {
  description = "Environment name"
  value       = var.environment
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

output "availability_zones" {
  description = "List of availability zones used"
  value       = local.azs
}

# Kubernetes Configuration
output "kubeconfig" {
  description = "kubectl config as generated by the module"
  value = templatefile("${path.module}/templates/kubeconfig.yaml", {
    cluster_name                      = aws_eks_cluster.joynt_cluster.name
    endpoint                          = aws_eks_cluster.joynt_cluster.endpoint
    certificate_authority_data        = aws_eks_cluster.joynt_cluster.certificate_authority[0].data
    region                           = var.aws_region
  })
  sensitive = true
}

# Application URLs (to be used after deployment)
output "application_urls" {
  description = "Application URLs for different environments"
  value = {
    api_url      = "https://api.${var.domain_name}"
    frontend_url = "https://app.${var.domain_name}"
    admin_url    = "https://admin.${var.domain_name}"
    docs_url     = "https://docs.${var.domain_name}"
  }
}

# Monitoring and Logging
output "cloudwatch_log_groups" {
  description = "CloudWatch log groups created"
  value = {
    eks_cluster = aws_cloudwatch_log_group.eks_cluster.name
    rds         = aws_cloudwatch_log_group.rds.name
    redis       = aws_cloudwatch_log_group.redis.name
  }
}

# Backup Information
output "backup_vault_arn" {
  description = "ARN of the backup vault"
  value       = aws_backup_vault.joynt_db_backup.arn
}

output "backup_plan_arn" {
  description = "ARN of the backup plan"
  value       = aws_backup_plan.joynt_db_backup.arn
}

# Cost Optimization Information
output "spot_node_groups" {
  description = "Spot instance node groups for cost optimization"
  value = [
    for k, v in local.node_groups : k
    if lookup(v, "capacity_type", "") == "SPOT"
  ]
}

# Security Groups
output "security_group_ids" {
  description = "Security group IDs created"
  value = {
    eks_cluster    = aws_security_group.eks_cluster.id
    eks_nodes      = aws_security_group.eks_nodes.id
    rds           = aws_security_group.rds.id
    redis         = aws_security_group.redis.id
    alb           = aws_security_group.alb.id
    vpc_endpoints = aws_security_group.vpc_endpoints.id
  }
}

# Tags
output "common_tags" {
  description = "Common tags applied to all resources"
  value       = local.common_tags
}