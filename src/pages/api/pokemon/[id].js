import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(pokemon);
  } else {
    res
      .status(403)
      .send("Invalid method type. Only GET allowed, this is a read only db.");
  }
}
