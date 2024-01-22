param location string

resource appConfiguration 'Microsoft.AppConfiguration/configurationStores@2023-03-01' = {
  name: 'learn-nextjs-app-configuration'
  location: location
   sku: {
     name: 'Free'
   }
}
