import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { AwsRum, AwsRumConfig } from 'aws-rum-web';

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn: "arn:aws:iam::130107406234:role/RUM-Monitor-us-east-2-130107406234-2690038326071-Unauth",
    identityPoolId: "us-east-2:fcffe583-3d3e-40e4-86f6-b0b97f446d8a",
    endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID: string = 'c0ab3a89-a417-4e1b-bf71-6d1d1ad97c26';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-east-2';

  // const awsRum: AwsRum = new AwsRum(
  new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

createApp(App).mount('#app')
