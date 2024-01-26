variable "aws_region" {
  type    = string
  default = "us-east-2"
}

variable "github_access_token" {
  type      = string
  sensitive = true
}
