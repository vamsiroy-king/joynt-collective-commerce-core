# Joynt Platform - Secrets Management
# AWS Secrets Manager for secure credential storage

# Database credentials
resource "aws_secretsmanager_secret" "database_credentials" {
  name        = "${local.cluster_name}/database/credentials"
  description = "Database credentials for Joynt platform"
  kms_key_id  = aws_kms_key.joynt_key.arn

  replica {
    region     = var.dr_region
    kms_key_id = aws_kms_key.joynt_key.arn
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-database-credentials"
  })
}

resource "aws_secretsmanager_secret_version" "database_credentials" {
  secret_id = aws_secretsmanager_secret.database_credentials.id
  secret_string = jsonencode({
    username = aws_db_instance.joynt_primary.username
    password = random_password.db_password.result
    engine   = "postgres"
    host     = aws_db_instance.joynt_primary.endpoint
    port     = aws_db_instance.joynt_primary.port
    dbname   = aws_db_instance.joynt_primary.db_name
    uri      = "postgresql://${aws_db_instance.joynt_primary.username}:${random_password.db_password.result}@${aws_db_instance.joynt_primary.endpoint}:${aws_db_instance.joynt_primary.port}/${aws_db_instance.joynt_primary.db_name}"
  })
}

# Redis credentials
resource "aws_secretsmanager_secret" "redis_credentials" {
  name        = "${local.cluster_name}/redis/credentials"
  description = "Redis credentials for Joynt platform"
  kms_key_id  = aws_kms_key.joynt_key.arn

  replica {
    region     = var.dr_region
    kms_key_id = aws_kms_key.joynt_key.arn
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-redis-credentials"
  })
}

resource "aws_secretsmanager_secret_version" "redis_credentials" {
  secret_id = aws_secretsmanager_secret.redis_credentials.id
  secret_string = jsonencode({
    auth_token = random_password.redis_password.result
    host       = aws_elasticache_replication_group.joynt_redis.primary_endpoint_address
    port       = aws_elasticache_replication_group.joynt_redis.port
    uri        = "redis://:${random_password.redis_password.result}@${aws_elasticache_replication_group.joynt_redis.primary_endpoint_address}:${aws_elasticache_replication_group.joynt_redis.port}"
  })
}

# Application secrets
resource "aws_secretsmanager_secret" "app_secrets" {
  name        = "${local.cluster_name}/app/secrets"
  description = "Application secrets for Joynt platform"
  kms_key_id  = aws_kms_key.joynt_key.arn

  replica {
    region     = var.dr_region
    kms_key_id = aws_kms_key.joynt_key.arn
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-app-secrets"
  })
}

# Generate random JWT secret
resource "random_password" "jwt_secret" {
  length  = 64
  special = true
}

# Generate random API key
resource "random_password" "api_key" {
  length  = 32
  special = false
}

# Generate random webhook secret
resource "random_password" "webhook_secret" {
  length  = 32
  special = false
}

resource "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
    jwt_secret                = random_password.jwt_secret.result
    api_key                   = random_password.api_key.result
    webhook_secret           = random_password.webhook_secret.result
    encryption_key           = base64encode(random_bytes.encryption_key.result)
    stripe_webhook_secret    = "whsec_your_stripe_webhook_secret_here"
    stripe_secret_key        = "sk_live_your_stripe_secret_key_here"
    stripe_publishable_key   = "pk_live_your_stripe_publishable_key_here"
    sendgrid_api_key        = "SG.your_sendgrid_api_key_here"
    twilio_auth_token       = "your_twilio_auth_token_here"
    twilio_account_sid      = "your_twilio_account_sid_here"
    openai_api_key          = "sk-your_openai_api_key_here"
    blockchain_private_key  = "your_ethereum_private_key_here"
    aws_ses_region          = var.aws_region
    cloudfront_domain       = aws_cloudfront_distribution.joynt_cdn.domain_name
    s3_bucket_name          = aws_s3_bucket.joynt_assets.bucket
  })
}

# Random bytes for encryption
resource "random_bytes" "encryption_key" {
  length = 32
}

# SSL Certificate secrets (for custom domains)
resource "aws_secretsmanager_secret" "ssl_certificates" {
  name        = "${local.cluster_name}/ssl/certificates"
  description = "SSL certificates for custom domains"
  kms_key_id  = aws_kms_key.joynt_key.arn

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-ssl-certificates"
  })
}

# Monitoring secrets
resource "aws_secretsmanager_secret" "monitoring_secrets" {
  name        = "${local.cluster_name}/monitoring/secrets"
  description = "Monitoring and alerting secrets"
  kms_key_id  = aws_kms_key.joynt_key.arn

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-monitoring-secrets"
  })
}

resource "aws_secretsmanager_secret_version" "monitoring_secrets" {
  secret_id = aws_secretsmanager_secret.monitoring_secrets.id
  secret_string = jsonencode({
    slack_webhook_url        = var.slack_webhook_url
    pagerduty_integration_key = var.pagerduty_integration_key
    datadog_api_key         = "your_datadog_api_key_here"
    newrelic_license_key    = "your_newrelic_license_key_here"
    grafana_admin_password  = random_password.grafana_admin.result
  })
}

# Generate Grafana admin password
resource "random_password" "grafana_admin" {
  length  = 16
  special = true
}

# External API secrets
resource "aws_secretsmanager_secret" "external_api_secrets" {
  name        = "${local.cluster_name}/external-apis/secrets"
  description = "External API keys and secrets"
  kms_key_id  = aws_kms_key.joynt_key.arn

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-external-api-secrets"
  })
}

resource "aws_secretsmanager_secret_version" "external_api_secrets" {
  secret_id = aws_secretsmanager_secret.external_api_secrets.id
  secret_string = jsonencode({
    google_maps_api_key     = "your_google_maps_api_key_here"
    facebook_app_secret     = "your_facebook_app_secret_here"
    google_oauth_secret     = "your_google_oauth_secret_here"
    apple_team_id          = "your_apple_team_id_here"
    apple_key_id           = "your_apple_key_id_here"
    apple_private_key      = "your_apple_private_key_here"
    paypal_client_secret   = "your_paypal_client_secret_here"
    amazon_pay_secret      = "your_amazon_pay_secret_here"
  })
}

# Backup encryption keys
resource "aws_secretsmanager_secret" "backup_encryption" {
  name        = "${local.cluster_name}/backup/encryption-keys"
  description = "Backup encryption keys"
  kms_key_id  = aws_kms_key.joynt_key.arn

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-backup-encryption"
  })
}

resource "random_password" "backup_encryption_key" {
  length  = 64
  special = false
}

resource "aws_secretsmanager_secret_version" "backup_encryption" {
  secret_id = aws_secretsmanager_secret.backup_encryption.id
  secret_string = jsonencode({
    primary_key   = random_password.backup_encryption_key.result
    secondary_key = random_password.backup_encryption_secondary.result
    salt         = base64encode(random_bytes.backup_salt.result)
  })
}

resource "random_password" "backup_encryption_secondary" {
  length  = 64
  special = false
}

resource "random_bytes" "backup_salt" {
  length = 32
}

# Certificate Authority secrets for internal TLS
resource "aws_secretsmanager_secret" "ca_certificates" {
  name        = "${local.cluster_name}/ca/certificates"
  description = "Certificate Authority for internal TLS"
  kms_key_id  = aws_kms_key.joynt_key.arn

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-ca-certificates"
  })
}

# Generate CA certificate and key
resource "tls_private_key" "ca_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "tls_self_signed_cert" "ca_cert" {
  private_key_pem = tls_private_key.ca_key.private_key_pem

  subject {
    common_name  = "Joynt Internal CA"
    organization = "Joynt Platform"
  }

  validity_period_hours = 87600 # 10 years

  is_ca_certificate = true

  allowed_uses = [
    "key_encipherment",
    "digital_signature",
    "cert_signing",
    "crl_signing",
  ]
}

resource "aws_secretsmanager_secret_version" "ca_certificates" {
  secret_id = aws_secretsmanager_secret.ca_certificates.id
  secret_string = jsonencode({
    ca_certificate = tls_self_signed_cert.ca_cert.cert_pem
    ca_private_key = tls_private_key.ca_key.private_key_pem
  })
}