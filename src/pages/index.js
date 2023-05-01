import Image from "next/image";
import getOptionsForVote from "../utils/getRandomPokemon";
import { useState } from "react";
import getBaseUrl from "../utils/getBaseUrl";

function MainPage({ poke1, poke2, host }) {
  const [pokemons, setPokemons] = useState([poke1, poke2]);
  async function incrementVoteCount(pokemon) {
    console.log(pokemon);
    await fetch(`${getBaseUrl()}/api/pokemon/${pokemon.id}`, {
      method: "PUT",
    }).catch((err) => {
      console.error(err);
    });
    const { poke1, poke2 } = await generateNewPokemons(host);
    setPokemons([poke1, poke2]);
  }

  return (
    <div class="h-screen w-screen">
      <div class="w-full text-center m-10">
        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Which pokemon is rounder?
        </h1>
      </div>
      <div class="flex-wrap items-center justify-center gap-8 text-center sm:flex">
        <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div className="">
            <Image
              src={pokemons[0].img_uri}
              width={300}
              height={300}
              className="rounded-md object-cover"
              alt={pokemons[0].img_uri}
            />
          </div>
          <div>
            <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              {pokemons[0].name}
            </h3>
          </div>
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => incrementVoteCount(pokemons[0])}
            >
              Rounder
            </button>
          </div>
        </div>
        <h1 class="text-gray-800">vs.</h1>
        <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="">
            <Image
              src={pokemons[1].img_uri}
              width={300}
              height={300}
              className="rounded-md object-cover"
              alt={pokemons[1].img_uri}
            />
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            {pokemons[1].name}
          </h3>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => incrementVoteCount(pokemons[1])}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
}

async function generateNewPokemons(host) {
  const poke_ids = getOptionsForVote();
  const path = getBaseUrl();
  console.log(`${path}/api/pokemon/${poke_ids[0]}`);
  const poke1 = await fetch(`${path}/api/pokemon/${poke_ids[0]}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  const poke2 = await fetch(`${path}/api/pokemon/${poke_ids[1]}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  return { poke1: poke1, poke2: poke2 };
}

// This gets called on every request
export async function getServerSideProps({ req }) {
  const host = req.headers.host;
  const { poke1, poke2 } = await generateNewPokemons(host);
  return { props: { poke1, poke2, host } };
}

export default MainPage;
