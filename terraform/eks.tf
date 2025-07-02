# Joynt Platform - Amazon EKS Cluster Configuration
# Scalable Kubernetes cluster with GPU support for AI workloads

# EKS Cluster
resource "aws_eks_cluster" "joynt_cluster" {
  name     = local.cluster_name
  version  = local.eks_version
  role_arn = aws_iam_role.eks_cluster.arn

  vpc_config {
    subnet_ids              = concat(aws_subnet.private[*].id, aws_subnet.public[*].id)
    endpoint_private_access = var.eks_endpoint_private_access
    endpoint_public_access  = var.eks_endpoint_public_access
    public_access_cidrs    = var.eks_endpoint_public_access_cidrs
    security_group_ids     = [aws_security_group.eks_cluster.id]
  }

  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]

  encryption_config {
    provider {
      key_arn = aws_kms_key.joynt_key.arn
    }
    resources = ["secrets"]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_service_policy,
    aws_cloudwatch_log_group.eks_cluster,
  ]

  tags = merge(local.common_tags, {
    Name = local.cluster_name
  })
}

# CloudWatch Log Group for EKS cluster
resource "aws_cloudwatch_log_group" "eks_cluster" {
  name              = "/aws/eks/${local.cluster_name}/cluster"
  retention_in_days = 30
  kms_key_id        = aws_kms_key.joynt_key.arn

  tags = local.common_tags
}

# EKS Node Groups
resource "aws_eks_node_group" "joynt_nodes" {
  for_each = local.node_groups

  cluster_name    = aws_eks_cluster.joynt_cluster.name
  node_group_name = "${local.cluster_name}-${each.key}"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = aws_subnet.private[*].id

  capacity_type  = each.value.capacity_type
  instance_types = each.value.instance_types

  scaling_config {
    desired_size = each.value.desired_size
    max_size     = each.value.max_size
    min_size     = each.value.min_size
  }

  update_config {
    max_unavailable_percentage = 25
  }

  # GPU node groups get special taints
  dynamic "taint" {
    for_each = lookup(each.value, "taints", [])
    content {
      key    = taint.value.key
      value  = taint.value.value
      effect = taint.value.effect
    }
  }

  launch_template {
    id      = aws_launch_template.eks_nodes[each.key].id
    version = aws_launch_template.eks_nodes[each.key].latest_version
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
  ]

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-${each.key}-nodes"
  })
}

# Launch Templates for Node Groups
resource "aws_launch_template" "eks_nodes" {
  for_each = local.node_groups

  name = "${local.cluster_name}-${each.key}-template"

  vpc_security_group_ids = [aws_security_group.eks_nodes.id]

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size           = each.key == "ai_gpu" ? 100 : 50
      volume_type           = "gp3"
      iops                  = 3000
      throughput            = 125
      encrypted             = true
      kms_key_id            = aws_kms_key.joynt_key.arn
      delete_on_termination = true
    }
  }

  user_data = base64encode(templatefile("${path.module}/templates/userdata.sh", {
    cluster_name        = local.cluster_name
    cluster_endpoint    = aws_eks_cluster.joynt_cluster.endpoint
    cluster_ca          = aws_eks_cluster.joynt_cluster.certificate_authority[0].data
    bootstrap_arguments = each.key == "ai_gpu" ? "--container-runtime containerd --enable-docker-bridge true" : ""
  }))

  tag_specifications {
    resource_type = "instance"
    tags = merge(local.common_tags, {
      Name                                        = "${local.cluster_name}-${each.key}-node"
      "kubernetes.io/cluster/${local.cluster_name}" = "owned"
    })
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-${each.key}-template"
  })
}

# EKS Addons
resource "aws_eks_addon" "vpc_cni" {
  cluster_name             = aws_eks_cluster.joynt_cluster.name
  addon_name               = "vpc-cni"
  addon_version            = "v1.15.1-eksbuild.1"
  resolve_conflicts        = "OVERWRITE"
  service_account_role_arn = aws_iam_role.vpc_cni.arn

  depends_on = [aws_eks_node_group.joynt_nodes]

  tags = local.common_tags
}

resource "aws_eks_addon" "coredns" {
  cluster_name      = aws_eks_cluster.joynt_cluster.name
  addon_name        = "coredns"
  addon_version     = "v1.10.1-eksbuild.5"
  resolve_conflicts = "OVERWRITE"

  depends_on = [aws_eks_node_group.joynt_nodes]

  tags = local.common_tags
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name      = aws_eks_cluster.joynt_cluster.name
  addon_name        = "kube-proxy"
  addon_version     = "v1.28.2-eksbuild.2"
  resolve_conflicts = "OVERWRITE"

  depends_on = [aws_eks_node_group.joynt_nodes]

  tags = local.common_tags
}

resource "aws_eks_addon" "ebs_csi_driver" {
  cluster_name             = aws_eks_cluster.joynt_cluster.name
  addon_name               = "aws-ebs-csi-driver"
  addon_version            = "v1.24.0-eksbuild.1"
  resolve_conflicts        = "OVERWRITE"
  service_account_role_arn = aws_iam_role.ebs_csi.arn

  depends_on = [aws_eks_node_group.joynt_nodes]

  tags = local.common_tags
}

# OIDC Provider for service account role assumption
data "tls_certificate" "eks_cluster" {
  url = aws_eks_cluster.joynt_cluster.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "eks_cluster" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.eks_cluster.certificates[0].sha1_fingerprint]
  url             = aws_eks_cluster.joynt_cluster.identity[0].oidc[0].issuer

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-oidc"
  })
}

# Fargate Profile for system workloads
resource "aws_eks_fargate_profile" "system" {
  cluster_name           = aws_eks_cluster.joynt_cluster.name
  fargate_profile_name   = "system"
  pod_execution_role_arn = aws_iam_role.fargate_pod.arn
  subnet_ids             = aws_subnet.private[*].id

  selector {
    namespace = "kube-system"
    labels = {
      "app.kubernetes.io/name" = "aws-load-balancer-controller"
    }
  }

  selector {
    namespace = "kube-system"
    labels = {
      "app.kubernetes.io/name" = "cluster-autoscaler"
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.fargate_pod_execution_policy,
  ]

  tags = local.common_tags
}

# EKS Identity Provider Config for OIDC
resource "aws_eks_identity_provider_config" "oidc" {
  cluster_name = aws_eks_cluster.joynt_cluster.name

  oidc {
    client_id                     = "sts.amazonaws.com"
    identity_provider_config_name = "joynt-oidc"
    issuer_url                   = aws_eks_cluster.joynt_cluster.identity[0].oidc[0].issuer
    groups_claim                 = "groups"
    groups_prefix                = "oidc:"
    username_claim               = "email"
    username_prefix              = "oidc:"
  }

  tags = local.common_tags
}