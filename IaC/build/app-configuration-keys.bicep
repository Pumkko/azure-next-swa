resource AppConfigurationStore 'Microsoft.AppConfiguration/configurationStores@2023-03-01' existing = {
  name: 'learn-nextjs-app-configuration'
}


resource RickAndMortyApiEndpointConf 'Microsoft.AppConfiguration/configurationStores/keyValues@2023-03-01' = {
  name: 'rick-and-morty-api-endpoint'
  parent: AppConfigurationStore
  properties: {
    contentType: 'string'
    value: 'https://rickandmortyapi.com/api/character'
  }
}
