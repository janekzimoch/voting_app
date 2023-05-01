import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await prisma.pokemon.findMany();
    res.status(200).json(response);
  } else {
    res
      .status(403)
      .send("Invalid method type. Only GET allowed, this is a read only db.");
  }
}
