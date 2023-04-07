import Image from 'next/image'
import chalizard from '../sample_images/chalizard.png'

const selected_tab_css = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";
const secondary_tab_css = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

export default function NavBar({ page, setPage }) {
  function handlePage(type) {
    setPage(type);
  }
  console.log(page)
  let vote_style = page === 'vote' ? selected_tab_css : secondary_tab_css;
  let results_style = page === 'results' ? selected_tab_css : secondary_tab_css;
  console.log(vote_style)

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span class="flex items-center">
            <Image src={chalizard} class="h-12 w-12" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vote-mon</span>
        </span>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button onClick={() => handlePage('vote')} class={vote_style}>Vote</button>
            </li>
            <li>
              <button onClick={() => handlePage('results')} class={results_style}>Results</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}