import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createAmplifyHosting } from './hosting/amplify';
import * as dotenv from 'dotenv';
dotenv.config();


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
      repo: process.env.GITHUB_REPO_NAME || 'RepoIsUNDEFINED!',
      appName: 'dev-cdk-handbook', //change this before creating another amplify deployment for a branch: e.g.: `prod-cdk-handbook`
      stage: 'prod',
      branch: 'dev' //change this with a branch you want to create amplify depliyment for: e.g.: `main`
    }

    // add another amplifyConfig for another branch like this:
    // const amplifyConfigProd = {
    //   ghOwner: 'FeroHriadel',
    //   ghTokenName: 'github-token',
    //   repo: process.env.GITHUB_REPO_NAME || 'RepoIsUNDEFINED!',
    //   appName: 'prod-cdk-handbook',
    //   stage: 'prod',
    //   branch: 'main'
    // } 

    const amplifyAppDev = createAmplifyHosting(this, amplifyConfigDev);
    //add more deployments for more branches like this:
    // const amplifyProdDev = createAmplifyH/osting(this, amplifyConfigProd)
  }
}
