variable "aws_region" {
  type    = string
  default = "us-east-2"
}

variable "github_access_token" {
  type      = string
  sensitive = true
}

variable "rum_guest_role_arn" {
  type = string
}

variable "rum_identity_pool_id" {
  type = string
}

variable "rum_endpoint" {
  type = string
}

variable "rum_application_id" {
  type = string
}

variable "rum_application_region" {
  type = string
}
