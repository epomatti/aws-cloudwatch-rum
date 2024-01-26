# AWS CloudWatch RUM

AWS RUM instrumentation.

## Running on AWS

Copy the variables file:

```sh
cp config/template.tfvars .auto.tfvars
```

Set the GitHub token with webhook permissions.

Create the infrastructure:

```sh
terraform init
terraform apply -auto-apply
```

Create the app monitor with the Amplify URL, and update the `.auto.tfvars` file.


## Running locally

[Create app monitor][1] for `localhost`.

Set up the environments file:

```sh
cp .env.template .env.local
```

Run the application:

```sh
yarn install
yarn run dev
```

[1]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-authorization.html
