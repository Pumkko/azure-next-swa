This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# WHAT DID I LEARN

## Deployment 
Seriously I tried to deploy it as : 
Azure Static Web App, catastrophic failure it just does not work with Next 14 (the doc is pretty clear on that)
App service with code deployment, maybe possible but just could not make it work
App service with Docker deployment, this time it works just right, using the dockerfile from NextJs sample : https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

## Configuration 
That one is tricky. One thing I did not get at first is that NextJS will aggressively try to do as much SSG as possible. 
That means much of the configuration must be known at compile time. Take page.tsx `getCharacters` function. 
If the endpoint in `fetch` is not a valid URL `npm run build` will fail.
I tried to use a Azure App Configuration with a managed identity to allow the app service to read from it without a password
but that can not possibly ever work. Since the App Configuration needs to be accessible during when building the app.

I could try to : 
Save a connection string to the App Configuration as a GITHUB_SECRETS
Read from that configuration using the connection string.

Otherwise GITHUB secrets are your friends.