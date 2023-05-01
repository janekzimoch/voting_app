export default async function getPokemon(id) {
  const poke = await fetch(`http://localhost:3003/api/pokemon/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
}
