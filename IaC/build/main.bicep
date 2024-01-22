param location string = 'eastus'
@secure()
param dockerRegistryServerUrl string
@secure()
param dockerRegistryServerUserName string
@secure()
param dockerRegistryServerPassword string

param learnNextJsAppImageName string
param learnNextJsAppImageTag string

module appServiceModule 'app-service.bicep' = {
  name: 'appServiceModule'
  params: {
    dockerRegistryServerPassword: dockerRegistryServerPassword
    dockerRegistryServerUrl: dockerRegistryServerUrl
    dockerRegistryServerUserName: dockerRegistryServerUserName
    learnNextJsAppImageName: learnNextJsAppImageName
    learnNextJsAppImageTag: learnNextJsAppImageTag
    location: location
  }
}

module appConfigurationKeysModule 'app-configuration-keys.bicep' = {
  name: 'appConfigurationKeysModule'
}
