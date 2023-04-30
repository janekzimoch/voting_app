import { createHTTPServer } from "@trpc/server/adapters/standalone";

import * as trpc from "@trpc/server";
import { z } from "zod";
// import { prisma } from "@/backend/utils/prisma";
// import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { PokemonClient } from "pokenode-ts";

const t = trpc.initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  getPokemonById: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonById(input.id)
    return { name: pokemon.name, img: pokemon.sprites}
  }),
  // .mutation("cast-vote", {
  //   input: z.object({
  //     votedFor: z.number(),
  //     votedAgainst: z.number(),
  //   }),
  //   async resolve({ input }) {
  //     const voteInDb = await prisma.vote.create({
  //       data: {
  //         votedAgainstId: input.votedAgainst,
  //         votedForId: input.votedFor,
  //       },
  //     });
  //     return { success: true, vote: voteInDb };
  //   },
  // })
});
// export type definition of API
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});
 
server.listen(3008);