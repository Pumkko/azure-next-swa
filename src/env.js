import { AppConfigurationClient } from '@azure/app-configuration';
import * as v from 'valibot'


const confSchema = v.object({
    RICK_AND_MORTY_API_ENDPOINT: v.string([v.url()])
});

async function getConfigFromEnvFile() {
    const result = v.safeParse(confSchema, process.env);
    if (!result.success) {
        throw new Error("Failed to validate conf from env file");
    }

    return result.output;
}

/**
 * Get the value associated with the given key in Azure App Configuration
 * @param {*} client azure app configuration client
 * @param {*} key The name associated with the value in Azure App Configuration. 
 * To succeed the Key/Value pair must be declared in app-configuration-keys.bicep
 * @returns 
 */
async function getKeyFromAzureAppConfig(client, key) {
    const setting = await client.getConfigurationSetting({
        key
    });
    if (!setting.value) {
        throw new Error(`Failed to fetch key ${key}, check azure conf`);
    }

    return setting.value
}

async function getConfigFromAzureAppConfiguration() {
    if (!process.env.AZURE_APP_CONFIGURATION_CONNECTION_STRING) {
        throw new Error("Failed to read env AZURE_APP_CONFIGURATION_CONNECTION_STRING from env file");
    }
    const client = new AppConfigurationClient(process.env.AZURE_APP_CONFIGURATION_CONNECTION_STRING);
    const rickAndMortyApiEndpoint = await getKeyFromAzureAppConfig(client, 'rick-and-morty-api-endpoint');

    const configObject = {
        RICK_AND_MORTY_API_ENDPOINT: rickAndMortyApiEndpoint
    }

    const result = v.safeParse(confSchema, configObject);
    if (!result.success) {
        throw new Error("Failed to validate config from azure App conf");
    }

    return result.output;
}


async function getConfig() {
    if (process.env.NODE_ENV === 'development') {
        return getConfigFromEnvFile();
    } else {
        return getConfigFromAzureAppConfiguration();
    }
}

export const AppConf = await getConfig();