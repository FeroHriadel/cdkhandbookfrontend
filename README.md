# CDK HANDBOOK FRONTEND
- frontend to cdk handbook backend `TO DO: add link here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`



### FEATURES
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
- not implemented yet, coming soon
