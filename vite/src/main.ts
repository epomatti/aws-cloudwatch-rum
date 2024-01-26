import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { AwsRum, AwsRumConfig } from 'aws-rum-web';

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 0.1,
    endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
    telemetries: [],
    allowCookies: false,
    enableXRay: false
  };

  const APPLICATION_ID: string = '21c5f293-6aa4-40fd-b464-b3032719803f';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-east-2';

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

createApp(App).mount('#app')
