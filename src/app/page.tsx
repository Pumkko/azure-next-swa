import { AppConf } from '@/env';
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
  const charactersResponse = await fetch(AppConf.RICK_AND_MORTY_API_ENDPOINT);
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
      <h1>Characters with validation</h1>
      {
        characters.map(c => <p key={c.id}>{c.name}</p>)
      }
    </main >
  );
}
