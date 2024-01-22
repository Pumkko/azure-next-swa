This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# WHAT DID I LEARN

## Deployment 
Seriously I tried to deploy it as : 
Azure Static Web App, catastrophic failure it just does not work with Next 14 (the doc is pretty clear on that)
App service with code deployment, maybe possible but just could not make it work
App service with Docker deployment, this time it works just right, using the dockerfile from NextJs sample : https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

### Deployment with Bicep
So I setup two bicep folders 
    - build
    - pre-build
This idea is simple, i need to setup a container registry and a Azure App Configuration. I need to create github secrets from 
those two services. But it is quite complicated to do that with bicep in one go. Terraform would be useful here but i try to stick to bicep
for this project (for learning purposes).
The easiest thing i found is to create those two services "manually" IE execute the bicep files with the CLI. 
In a way it makes sense, those two services never change after creation, they're needed to "bootstrap" the app
Those files can be found under `pre-build`

The other folder `build` contains the app service and the different key value to save in Azure App Configuration.
Those do change each build, the app service need to target a diffent docker image, and the azure app configuration might have a new entry.

### Side note

To create a Linux Service Plan, it's important (and not well documented) to set `reserved: true`, just `Kind: Linux` is not enough

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