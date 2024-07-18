# CDK HANDBOOK FRONTEND
- frontend to cdk handbook backend `TO DO: add link here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`



### FEATURES
- deployment to AWS Amplify using AWS CDK
- redux
- context
- aws-amplify for auth
- SEO optimized (/items, /items/[id], /categories, /tags)
- single & multiple image preview & upload
- user & admin roles



### SETUP
- first deploy the backend. 
- once deployment is over it should print api, userpool_id, client_id in the terminal. 
- bucket url must be found in the aws console. Only copy the part of bucket url without `https://` (just: `cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com`)
- create `/.env`
- put there: <br />

```
NEXT_PUBLIC_API = https://g7fdfmdz4up.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_USERPOOL_ID = us-east-1_2wYSARt66
NEXT_PUBLIC_USERPOOL_CLIENT_ID = 5ji52gedek4lerrtki1ib0h2po
NEXT_PUBLIC_IMAGES_BUCKET = cdk-handbook-images-bucket-05prt4i.s3.us-east-1.amazonaws.com
NEXT_PUBLIC_APP_URL = http://localhost:3000
```

- `$ npm run dev` to run locally



### DEPLOYMENT
- push this code to github
- create a github token in github (like this) <br />

```
	Github / click ur profile picture (right up) / Settings
	(left sidebar) Developer Settings / Personal Access Tokens / Tokens (classic)
	Generate new token / choose classic / Select scopes: repo & admin:repo_hook / name it e.g.: `github-token` / Generate token
  Copy the value of the token (something like: `ghp_66PWc461Drgh0nvEFiiKnsabzPJtZf2583Wq`)
```

- Copy the value of the github-token and go to AWS / SECRETS MANAGER / Store a new secret / Other type of secret / Next 
- in Key/value pair section click `Plaintext` tab and paste the github-token there / Next / Secret name: `github-token` / Next / complete the procedure…
- go to frontend folder and run `$ npm run build`. See if it builds properly. Fix if not.
- go to frontend/tsconfig.json and add "deployment" to the "exclude" array (if not already there) : <br />

```
"exclude": ["node_modules", "cdk.out", "deployment]
```

- go to frontend/deployment and create a new file: `.env`.
- Fill it out with values that are true for you: <br />

```
ACCOUNT_ID=882688607993
REGION=us-east-1
APP_NAME=CdkHandbookFrontend
GITHUB_REPO_NAME=cdkhandbookfrontend
```

- go to go to frontend/deployment and run `$ npm i`
- go to frontend/deployment and run `$ cdk deploy --profile ferohriadeladmin`
- after deploy the `NEXT_PUBLIC_APP_URL: "http://localhost:3000"` in frontend/deployment/lib/hosting/amplify.ts is wrong. Because we didn't know ahead of time what url Amplify will give us. Paste the url of your ampligy deployment (or your domain name if applicable) instead of "http://localhost:3000` and push to github. 



