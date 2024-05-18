
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

Note
- if new installation, remmenber to create .env file and add end varrs from heroku

# deploy 
push to heroku/master for auto deployment
