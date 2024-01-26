terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.33.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_amplify_app" "frontend" {
  name                     = "amplify-rum"
  repository               = "https://github.com/epomatti/aws-cloudwatch-rum"
  access_token             = var.github_access_token
  enable_branch_auto_build = true
  platform                 = "WEB"

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "vite"
    _CUSTOM_IMAGE             = "public.ecr.aws/docker/library/node:20"

    VITE_RUM_GUEST_ROLE_ARN     = var.rum_guest_role_arn
    VITE_RUM_IDENTITY_POOL_ID   = var.rum_identity_pool_id
    VITE_RUM_ENDPOINT           = var.rum_endpoint
    VITE_RUM_APPLICATION_ID     = var.rum_application_id
    VITE_RUM_APPLICATION_REGION = var.rum_application_region
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = "main"
  framework   = "Vue"
  stage       = "PRODUCTION"
}

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = aws_amplify_branch.main.branch_name
}

locals {
  main_domain = "${aws_amplify_branch.main.branch_name}.${aws_amplify_app.frontend.default_domain}"
}

