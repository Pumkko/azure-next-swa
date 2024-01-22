import { AppConfigurationClient } from '@azure/app-configuration';
import * as v from 'valibot'

const rickAndMortyCharacterSchema = v.object({
  results: v.array(
    v.object({
      id: v.number(),
      name: v.string()
    })
  )
})

async function getCharacters() {
  if(!process.env.AZURE_APP_CONFIGURATION_CONNECTION_STRING){
    throw new Error("Failed to read env AZURE_APP_CONFIGURATION_CONNECTION_STRING, will parse env file with valibot later");
  }

  const client = new AppConfigurationClient(process.env.AZURE_APP_CONFIGURATION_CONNECTION_STRING);

  const setting = await client.getConfigurationSetting({
    key: "rick-and-morty-api-endpoint"
  });

  if(!setting.value){
    throw new Error("Failed to fetch rick and morty endpoint conf, check azure conf");
  }

  const charactersResponse = await fetch(setting.value);
  const characters = await charactersResponse.json();
  const characterParsed = v.safeParse(rickAndMortyCharacterSchema, characters);

  if (!characterParsed.success) {
    throw new Error('Failed to validate rick and morty api response');
  }

  return characterParsed.output.results;
}

export default async function Home() {

  const characters = await getCharacters();

  return (

    <main>
      <h1>Characters</h1>
      {
        characters.map(c => <p key={c.id}>{c.name}</p>)
      }
    </main >
  );
}
