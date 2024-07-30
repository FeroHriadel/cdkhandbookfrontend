# CDK HANDBOOK FRONTEND
- frontend to cdk handbook backend `https://github.com/FeroHriadel/cdkhandbookbackend.git`



## FEATURES
- deployment to AWS Amplify using AWS CDK
- CICD Pipeline(s)
- redux
- context
- aws-amplify for auth
- SEO optimized (/items, /items/[id], /categories, /tags)
- single & multiple image preview & upload
- user & admin roles



## SETUP
- first deploy the backend: `https://github.com/FeroHriadel/cdkhandbookbackend.git`
- once deployment is over it should print api, userpool_id, client_id in the terminal. 
- bucket url must be found in the aws console. Only copy the part of bucket url without `https://`and stage prefix (e.g.: dev-aws-handbook) (just: `cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com`)
- create `/.env`
- put there: <br />

```
NEXT_PUBLIC_API = https://g7fdfmdz4up.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_USERPOOL_ID = us-east-1_2wYSARt66
NEXT_PUBLIC_USERPOOL_CLIENT_ID = 5ji52gedek4lerrtki1ib0h2po
NEXT_PUBLIC_IMAGES_BUCKET = cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com
NEXT_PUBLIC_APP_URL = http://localhost:3000
```

- in /next.config.mjs add any bucket prefix you might need (it's already setup for `dev-aws-handbook` and `prod-aws-handbook`):
```
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  'dev-aws-handbook' + process.env.NEXT_PUBLIC_IMAGES_BUCKET,
        port: '',
        pathname: '/**',  // This allows all paths under the hostname
      },
      {
        protocol: 'https',
        hostname:  'prod-aws-handbook' + process.env.NEXT_PUBLIC_IMAGES_BUCKET,
        port: '',
        pathname: '/**',
      },
			//add more buckets with different prefixes here if necessary
    ],
  },
```

- `$ npm run dev` to run locally



## DEPLOYMENT
<sub>
The `/deployment` folder contains aws cdk code to deploy the frontend app on AWS Amplify.
It is currently setup to deploy the code from the `dev` branch under the app name: `dev-cdk-handbook`.
Please change these 2 if you need to have a deployment from another branch: `/deployment/lib/deployment-stack.ts` has detailed instructions on how to do that
</sub><br /><br />

<sub>
It is assumed that dev and prod branches will have their own aws amplify deployment. Other branches can develop from localhost
</sub><br /><br />

- create a github token in github (like this)

```
	Github / click ur profile picture (right up) / Settings
	(left sidebar) Developer Settings / Personal Access Tokens / Tokens (classic)
	Generate new token / choose classic / Select scopes: repo & admin:repo_hook / name it e.g.: `github-token` / Generate token
  Copy the value of the token (something like: `ghp_66PWc461Drgh0nvEFiiKnsabzPJtZf2583Wq`)
```

- Copy the value of the github-token and go to AWS / SECRETS MANAGER / Store a new secret / Other type of secret / Next 
- in Key/value pair section click `Plaintext` tab and paste the github-token there / Next / Secret name: `github-token` / Next / complete the procedure…
- go to frontend folder and run `$ npm run build`. See if it builds properly. Fix if not.
- go to frontend/tsconfig.json and add "deployment" to the "exclude" array (if not already there)

```
"exclude": ["node_modules", "cdk.out", "deployment"]
```

- go to frontend/deployment and create a new file: `.env`.
- Fill it out with values that are true for you: <br />

```
ACCOUNT_ID=882688607993
REGION=us-east-1
APP_NAME=CdkHandbookFrontend
GITHUB_REPO_NAME=cdkhandbookfrontend

NEXT_PUBLIC_API = https://g7fdfmdz4up.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_USERPOOL_ID = us-east-1_2wYSARt66
NEXT_PUBLIC_USERPOOL_CLIENT_ID = 5ji52gedek4lerrtki1ib0h2po
NEXT_PUBLIC_IMAGES_BUCKET = cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com
NEXT_PUBLIC_APP_URL = http://localhost:3000

IMAGES_BUCKET =  cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com   #no https://, no stage prefixes like `dev-aws-handbook` etc...
```

- go to go to frontend/deployment and run `$ npm i`
- go to frontend/deployment and run `$ cdk deploy --profile ferohriadeladmin`
- after the deployment the `NEXT_PUBLIC_APP_URL: "http://localhost:3000"` in frontend/deployment/.env is wrong. Because we didn't know ahead of time what url Amplify would give us. Paste the url of your ampligy deployment (or your domain name if applicable) instead of "http://localhost:3000` and push to github.




