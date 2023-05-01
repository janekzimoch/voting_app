import Image from "next/image";
import pikachu from '../sample_images/pikachu.jpeg'
import squirel from '../sample_images/squirel.jpeg'

const poke_data = [
  {'id': 1,
  'name': 'pikachu',
  'img_src': pikachu,
  'score': 4},
  {'id': 2,
  'name': 'squirel',
  'img_src': squirel,
  'score': 2}
]

export default function ResultsPage() {

  const results_list = poke_data.sort((fst, snd) => snd.score - fst.score)
  let list_component = results_list.map((poke) => {
    return (
      <li class="flex flex-row mb-2 border-gray-400">
        <div class="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
              <Image src={poke.img_src} class="mx-auto object-cover rounded-full h-10 w-10 "/>
            </div>
            <div class="flex-1 pl-1 md:mr-16">
                <div class="font-medium dark:text-white">
                    {poke.name}
                </div>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-200">
                {poke.score}
            </div>
        </div>
      </li>
    );
  })

  return (
    <div class="flex items-center justify-center mt-20">
      <div class="flex flex-col items-center text-center justify-center w-full mx-auto">
          <div class="flex flex-col px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Results:
            </h3>
          </div>
          <ul class="flex flex-col">
            {list_component}
          </ul>
      </div>
    </div>
  )
}