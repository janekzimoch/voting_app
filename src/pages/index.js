import Image from "next/image";
import { Inter } from "next/font/google";
import MainPage from "./MainPage";
import ResultsPage from "./ResultsPage";
import NavBar from "./NavBar";
import { useState } from "react";
import { Result } from "postcss";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../backend/router/index";

const inter = Inter({ subsets: ["latin"] });

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3008",
    }),
  ],
});

export default async function Home() {
  const [page, setPage] = useState("vote");
  let display_page;

  if (page === "vote") {
    display_page = <MainPage />;
  } else if (page === "results") {
    display_page = <ResultsPage />;
  } else {
    display_page = <h1>ERROR!</h1>; // TODO - figure out what to render
  }

  const pokemon = await trpc.getPokemonById(1);

  return (
    <div>
      {pokemon}
      <div>
        <NavBar page={page} setPage={setPage} />
      </div>
      <div>{display_page}</div>
    </div>
  );
}
