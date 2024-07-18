import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createAmplifyHosting } from './hosting/amplify';


/************************************************************************************

  TYPESCRIPT CLASH RESOLUTION
  if u have this app in your frontend dir (like e.g.: myFrontendApp/deployment) 
  please go to the FE tsconfig.json and put "deployment" to the "exclude" array. 
  Like this: "exclude": ["node_modules", "cdk.out", "deployment"]

  PRE-DEPLOY
  Please go to you FE directory and run `$ npm run build`
  Make sure it builds correctly
  If not, fix everything and then build again - else it won't build on amplify either

*************************************************************************************/


export class DeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyConfigDev = {
      ghOwner: 'FeroHriadel',
      ghTokenName: 'github-token',
      repo: 'cdkhandbookfrontend', //please put your github repo name here
      appName: 'cdk-handbook-dev',
      stage: 'dev',
      branch: 'dev'
    }
    const amplifyConfigProd = {
      ...amplifyConfigDev, 
      appName: 'cdk-handbook-prod', 
      stage: 'prod',
      branch: 'main'
    };
    

    // const amplifyAppDev = createAmplifyHosting(this, amplifyConfigDev); //uncomment for dev branch
    const amplifyAppProd = createAmplifyHosting(this, amplifyConfigProd);
  }
}
