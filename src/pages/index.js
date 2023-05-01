import Image from "next/image";
import getOptionsForVote from "../utils/getRandomPokemon";
import pikachu from "../sample_images/pikachu.jpeg";
import squirel from "../sample_images/squirel.jpeg";
import getPokemon from "../utils/api";

function MainPage({ poke1, poke2 }) {
  // console.log(poke_id1, poke_id2);

  return (
    <div class="h-screen w-screen">
      <div class="w-full text-center m-10">
        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Which pokemon is rounder?
        </h1>
      </div>
      <div class="flex-wrap items-center justify-center gap-8 text-center sm:flex">
        <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="">
            <Image
              src={poke1.img_uri}
              width="100"
              height="100"
              className="rounded-md object-cover"
              alt=""
            />
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            {poke1.name}
          </h3>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Rounder
          </button>
        </div>
        <h1 class="text-gray-800">vs.</h1>
        <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="">
            <Image
              src={poke2.img_uri}
              width="100"
              height="100"
              className="rounded-md object-cover"
              alt=""
            />
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            {poke2.name}
          </h3>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const poke_ids = getOptionsForVote();
  const poke1 = await fetch(
    `http://localhost:3005/api/pokemon/${poke_ids[0]}`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  const poke2 = await fetch(
    `http://localhost:3005/api/pokemon/${poke_ids[1]}`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  // Pass data to the page via props
  return { props: { poke1, poke2 } };
}

export default MainPage;
