#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AdotNamespaceStack } from '../lib/stack';

const app = new cdk.App();
new AdotNamespaceStack(app, 'AdotNamespaceStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
