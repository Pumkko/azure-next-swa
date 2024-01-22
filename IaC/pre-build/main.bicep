@description('Specifies the location for resources.')
param location string = 'eastus'

targetScope = 'subscription'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'learn-nextjs-rg'
  location: location
}

module containerRegistryModule 'container-registry.bicep' = {
  name: 'containerRegistryModule'
  scope: resourceGroup
  params: {
    location: location
  }
}

module appConfigurationModule 'app-configuration.bicep' = {
  scope: resourceGroup
  name: 'appConfigurationModule'
  params: {
    location: location
  }
}
