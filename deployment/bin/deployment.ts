#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeploymentStack } from '../lib/deployment-stack';
import * as dotenv from 'dotenv';
dotenv.config();



const app = new cdk.App();
new DeploymentStack(app, 'DeploymentStack', {
  env: {account: process.env.ACCOUNT_ID, region: process.env.REGION}, //not required - disables deploying to other than specified account & region
  stackName: process.env.APP_NAME //not required - in case you wanted to prefix a bucket with app name, etc...
});