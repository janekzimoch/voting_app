import { PassThrough } from "stream";
import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  let pokemon;

  switch (req.method) {
    case "GET":
      pokemon = await prisma.pokemon.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(pokemon);
      break;

    case "PUT":
      // increment vote count
      pokemon = await prisma.pokemon.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      const voteCount = pokemon.voteCount;
      const newPokemon = await prisma.pokemon.update({
        where: { id: parseInt(id) },
        data: { voteCount: voteCount + 1 },
      });
      res.status(201).json(newPokemon);
      break;

    default:
      res
        .status(403)
        .send("Invalid method type. Only GET allowed, this is a read only db.");
  }
}
