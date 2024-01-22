param location string
@secure()
param dockerRegistryServerUrl string
@secure()
param dockerRegistryServerUserName string
@secure()
param dockerRegistryServerPassword string

param learnNextJsAppImageName string
param learnNextJsAppImageTag string


resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'learn-nextjs-app-service-plan'
  kind: 'Linux'
  location: location
  sku: {
    name: 'F1'
    tier: 'Free'
  }
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: 'learn-nextjs-app-service'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${dockerRegistryServerUrl}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: dockerRegistryServerUserName
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: dockerRegistryServerPassword
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
      ]
      linuxFxVersion: 'DOCKER|${dockerRegistryServerUrl}/${learnNextJsAppImageName}:${learnNextJsAppImageTag}'
    }
  }

}
