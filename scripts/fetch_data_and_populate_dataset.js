// 1. access data from the pokemon api
// 2. see what data columns you care about: (1) pokemon name and (2) img source
// 3. create a function that takes index and teturns those features
// 4. generate json with all data
// 5. create prisma model for that data
// 6. create prisma code that instantiates database with this json file

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function extract_uri(results) {
  const uri = [];
  results.forEach((res) => {
    const id = res.url.split("/")[6];
    uri.push({
      name: res.name,
      img_uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
    });
  });
  return uri;
}

async function read_pokemon_api() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon-form?limit=2000")
    .then((res) => res.json())
    .then((res_json) => {
      const data = extract_uri(res_json.results);
      return data;
    })
    .catch((err) => console.log(err.message));
  return data;
}

async function main() {
  const pokemon_data = await read_pokemon_api();
  // console.log(pokemon_data);
  const createMany = await prisma.pokemon.createMany({
    data: pokemon_data,
    skipDuplicates: true, // Skip 'Bobo'
  });
  console.log(createMany);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
