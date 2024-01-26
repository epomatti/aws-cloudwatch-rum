import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { AwsRum, AwsRumConfig } from 'aws-rum-web';

const rumGuestRoleArn = import.meta.env.VITE_RUM_GUEST_ROLE_ARN;
const rumIdentityPoolId = import.meta.env.VITE_RUM_IDENTITY_POOL_ID;
const rumEndpoint = import.meta.env.VITE_RUM_ENDPOINT;
const rumApplicationId = import.meta.env.VITE_RUM_APPLICATION_ID;
const rumApplicationRegion = import.meta.env.VITE_RUM_APPLICATION_REGION;

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn: rumGuestRoleArn,
    identityPoolId: rumIdentityPoolId,
    endpoint: rumEndpoint,
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: true
  };

  const APPLICATION_ID: string = rumApplicationId;
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = rumApplicationRegion;

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
