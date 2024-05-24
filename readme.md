
# USES
---

- webpack (for build)
- node/express (for api)
- mongo (mlab) and mongoose
- backbone for front end app
- auth0 for user auth
- heroku - domain hosting
- github - code repo
- free ssl from somehwere??



# STRUCTURE
---
`/api` --- is backend app
`/src` and `/dist` ---- is front end backbone app



# PROCESS
---

how to run local
`npm run start` (builds webpack with --watch)
`heroku local web -f Procfile.dev` (runs nodemon on app.js)

new
- run `npm run start-react` to run react app from cleint-react dir

Note
- if new installation, remember to create .env file and add end vars from heroku
```AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
PROD_MONGODB=
OPENAI_SECRET_KEY=
```

# deploy 
push to heroku/main for auto deployment
