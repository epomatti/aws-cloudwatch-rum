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
  repository               = "https://github.com/epomatti/aws-cloudwatch-rum.git"
  access_token             = var.github_access_token
  enable_branch_auto_build = true
  platform                 = "WEB"

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "frontend"
    _CUSTOM_IMAGE             = "public.ecr.aws/docker/library/node:20"
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = "main"
  # framework   = "Vue"
  stage = "PRODUCTION"

}

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = aws_amplify_branch.main.branch_name
}
