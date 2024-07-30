import { SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";
import * as dotenv from 'dotenv';
dotenv.config();



type AmplifyHostingProps = {
  appName: string;
  stage: string;
  branch: string;
  ghOwner: string;
  repo: string;
  ghTokenName: string;
}



export function createAmplifyHosting(scope: Construct, props: AmplifyHostingProps) {
  const { appName, stage, branch, ghOwner, repo, ghTokenName } = props;

  //init ampify app (a lot of config ahead: )
  const amplifyApp = new amplify.App(scope, `${appName}-hosting`, {
    appName,
    sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
      owner: ghOwner, 
      repository: repo, 
      oauthToken: SecretValue.secretsManager(ghTokenName)
    }),
    platform: amplify.Platform.WEB_COMPUTE, //for NextJS SSR. Would not be necessary for client-side React apps
    autoBranchDeletion: true,
    customRules: [{source: '*', target: '/index.html', status: amplify.RedirectStatus.NOT_FOUND_REWRITE}],
    environmentVariables: {
      NEXT_PUBLIC_API: stage === 'dev' ? process.env.DEV_API!  : process.env.PROD_API!,
      NEXT_PUBLIC_USERPOOL_ID: stage === 'dev' ? process.env.DEV_USERPOOL_ID! : process.env.PROD_USERPOOL_ID!,
      NEXT_PUBLIC_USERPOOL_CLIENT_ID: stage === 'dev' ? process.env.DEV_USERPOOL_CLIENT_ID! : process.env.PROD_USERPOOL_CLIENT_ID!,
      NEXT_PUBLIC_APP_URL: stage === 'dev' ? process.env.DEV_APP_URL! : process.env.PROD_APP_URL!,
      NEXT_PUBLIC_IMAGES_BUCKET: "cdk-handbook-images-bucket-30krk3o.s3.us-east-1.amazonaws.com", //this is impotant for next.config.mjs so it knows what sources images can come from. The code in next.config.mjs will prepend both `dev` and `prod` to the bucket url, no need to do it here like: `stage === "dev" ? devBucket : prodBucket`
    },
    buildSpec: BuildSpec.fromObjectToYaml({
      version: 1,
      frontend: {
        phases: {
          preBuild: {commands: [
            'nvm install 20.12.2',
            'nvm use 20.12.2',
            'npm i'
          ]},
          build: {commands: [
            'npm run build'
          ]},
          postBuild: {commands: [
            'echo BUILD COMPLETE...'
          ]},
        },
        artifacts: {
          baseDirectory: '.next', //would be 'dist' for React app
          files: ['**/*']
        },
        cache: {
          paths: [
            'node_modules/**/*',
            '.next/cache/**/'
          ]
        }
      }
    })
  });

  //connect branch
  amplifyApp.addBranch(branch, {
    stage: branch === 'main' ? 'PRODUCTION' : 'DEVELOPMENT',
    branchName: branch
  });

  //return the amplify app
  return amplifyApp;
}