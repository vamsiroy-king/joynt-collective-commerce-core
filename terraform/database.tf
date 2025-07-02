# Joynt Platform - Database Infrastructure
# PostgreSQL RDS with read replicas and Redis cluster for caching

# DB Subnet Group
resource "aws_db_subnet_group" "joynt_db" {
  name       = "${local.cluster_name}-db-subnet-group"
  subnet_ids = aws_subnet.database[*].id

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-db-subnet-group"
  })
}

# RDS Parameter Group
resource "aws_db_parameter_group" "joynt_postgres" {
  family = "postgres15"
  name   = "${local.cluster_name}-postgres-params"

  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements"
  }

  parameter {
    name  = "log_statement"
    value = "all"
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }

  parameter {
    name  = "random_page_cost"
    value = "1.1"
  }

  parameter {
    name  = "effective_cache_size"
    value = "3584MB"
  }

  tags = local.common_tags
}

# Primary RDS Instance
resource "aws_db_instance" "joynt_primary" {
  identifier = "${local.cluster_name}-primary"

  # Engine configuration
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = local.rds_instance_class

  # Storage configuration
  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type          = "gp3"
  storage_encrypted     = true
  kms_key_id           = aws_kms_key.joynt_key.arn

  # Database configuration
  db_name  = "joynt"
  username = "joynt_admin"
  password = random_password.db_password.result
  port     = 5432

  # Network configuration
  db_subnet_group_name   = aws_db_subnet_group.joynt_db.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  # Backup configuration
  backup_retention_period = var.db_backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  copy_tags_to_snapshot  = true
  delete_automated_backups = false

  # High availability
  multi_az = var.db_multi_az

  # Monitoring
  enabled_cloudwatch_logs_exports = ["postgresql"]
  monitoring_interval             = 60
  monitoring_role_arn            = aws_iam_role.rds_monitoring.arn
  performance_insights_enabled   = true
  performance_insights_kms_key_id = aws_kms_key.joynt_key.arn

  # Parameter group
  parameter_group_name = aws_db_parameter_group.joynt_postgres.name

  # Security
  deletion_protection = var.environment == "production" ? true : false
  skip_final_snapshot = var.environment == "production" ? false : true
  final_snapshot_identifier = var.environment == "production" ? "${local.cluster_name}-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}" : null

  depends_on = [aws_cloudwatch_log_group.rds]

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-primary-db"
    Role = "Primary"
  })
}

# Read Replica for read-heavy workloads
resource "aws_db_instance" "joynt_replica" {
  count = var.environment == "production" ? 2 : 0

  identifier = "${local.cluster_name}-replica-${count.index + 1}"

  # Replica configuration
  replicate_source_db = aws_db_instance.joynt_primary.identifier
  instance_class      = "db.r6g.large"

  # Storage configuration
  storage_encrypted = true
  kms_key_id       = aws_kms_key.joynt_key.arn

  # Network configuration
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  # Monitoring
  enabled_cloudwatch_logs_exports = ["postgresql"]
  monitoring_interval             = 60
  monitoring_role_arn            = aws_iam_role.rds_monitoring.arn
  performance_insights_enabled   = true
  performance_insights_kms_key_id = aws_kms_key.joynt_key.arn

  # Security
  deletion_protection = false
  skip_final_snapshot = true

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-replica-${count.index + 1}"
    Role = "ReadReplica"
  })
}

# CloudWatch Log Group for RDS
resource "aws_cloudwatch_log_group" "rds" {
  name              = "/aws/rds/instance/${local.cluster_name}-primary/postgresql"
  retention_in_days = 7
  kms_key_id        = aws_kms_key.joynt_key.arn

  tags = local.common_tags
}

# Redis Subnet Group
resource "aws_elasticache_subnet_group" "joynt_redis" {
  name       = "${local.cluster_name}-redis-subnet-group"
  subnet_ids = aws_subnet.database[*].id

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-redis-subnet-group"
  })
}

# Redis Parameter Group
resource "aws_elasticache_parameter_group" "joynt_redis" {
  family = "redis7"
  name   = "${local.cluster_name}-redis-params"

  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"
  }

  parameter {
    name  = "timeout"
    value = "300"
  }

  parameter {
    name  = "tcp-keepalive"
    value = "60"
  }

  tags = local.common_tags
}

# Redis Replication Group (Cluster Mode)
resource "aws_elasticache_replication_group" "joynt_redis" {
  replication_group_id         = "${local.cluster_name}-redis"
  description                  = "Redis cluster for Joynt platform"

  # Engine configuration
  engine               = "redis"
  engine_version       = "7.0"
  node_type           = local.redis_node_type
  port                = 6379
  parameter_group_name = aws_elasticache_parameter_group.joynt_redis.name

  # Cluster configuration
  num_cache_clusters = var.redis_num_cache_clusters

  # Security
  subnet_group_name  = aws_elasticache_subnet_group.joynt_redis.name
  security_group_ids = [aws_security_group.redis.id]
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                 = random_password.redis_password.result
  kms_key_id                 = aws_kms_key.joynt_key.arn

  # Backup
  snapshot_retention_limit = var.environment == "production" ? 7 : 1
  snapshot_window         = "05:00-06:00"
  maintenance_window      = "sun:06:00-sun:07:00"

  # Monitoring
  log_delivery_configuration {
    destination      = aws_cloudwatch_log_group.redis.name
    destination_type = "cloudwatch-logs"
    log_format       = "text"
    log_type         = "slow-log"
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-redis-cluster"
  })
}

# CloudWatch Log Group for Redis
resource "aws_cloudwatch_log_group" "redis" {
  name              = "/aws/elasticache/redis/${local.cluster_name}"
  retention_in_days = 7
  kms_key_id        = aws_kms_key.joynt_key.arn

  tags = local.common_tags
}

# Database Monitoring Dashboard
resource "aws_cloudwatch_dashboard" "database" {
  dashboard_name = "${local.cluster_name}-database-monitoring"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", aws_db_instance.joynt_primary.id],
            ["AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", aws_db_instance.joynt_primary.id],
            ["AWS/RDS", "FreeableMemory", "DBInstanceIdentifier", aws_db_instance.joynt_primary.id],
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "RDS Primary Metrics"
          period  = 300
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/ElastiCache", "CPUUtilization", "CacheClusterId", aws_elasticache_replication_group.joynt_redis.id],
            ["AWS/ElastiCache", "CurrConnections", "CacheClusterId", aws_elasticache_replication_group.joynt_redis.id],
            ["AWS/ElastiCache", "DatabaseMemoryUsagePercentage", "CacheClusterId", aws_elasticache_replication_group.joynt_redis.id],
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "Redis Cluster Metrics"
          period  = 300
        }
      }
    ]
  })

  tags = local.common_tags
}

# Database backup automation
resource "aws_backup_vault" "joynt_db_backup" {
  name        = "${local.cluster_name}-db-backup-vault"
  kms_key_arn = aws_kms_key.joynt_key.arn

  tags = local.common_tags
}

resource "aws_backup_plan" "joynt_db_backup" {
  name = "${local.cluster_name}-db-backup-plan"

  rule {
    rule_name         = "daily_backup"
    target_vault_name = aws_backup_vault.joynt_db_backup.name
    schedule          = "cron(0 2 * * ? *)"

    recovery_point_tags = local.common_tags

    lifecycle {
      cold_storage_after = 30
      delete_after       = 365
    }

    copy_action {
      lifecycle {
        cold_storage_after = 30
        delete_after       = 365
      }
      destination_vault_arn = aws_backup_vault.joynt_db_backup.arn
    }
  }

  tags = local.common_tags
}