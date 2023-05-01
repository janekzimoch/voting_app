import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import chalizard from "../sample_images/chalizard.png";

const selected_tab_css =
  "block py-2 pl-3 pr-4 text-white bg-blue-400 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";
const secondary_tab_css =
  "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

export default function Navbar() {
  const route = useRouter();

  let vote_style =
    route.pathname === "/" ? selected_tab_css : secondary_tab_css;
  let results_style =
    route.pathname === "/results" ? selected_tab_css : secondary_tab_css;

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="flex items-center">
            <Image src={chalizard} className="h-12 w-12" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Vote-mon
            </span>
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href={"/"} className={vote_style}>
                  Vote
                </Link>
              </li>
              <li>
                <Link href={"/results"} className={results_style}>
                  Results
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
