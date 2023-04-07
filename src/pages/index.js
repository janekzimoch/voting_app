import Image from 'next/image'
import { Inter } from 'next/font/google'
import MainPage from './MainPage';
import ResultsPage from './ResultsPage';
import NavBar from './NavBar';
import { useState } from 'react';
import { Result } from 'postcss';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [page, setPage] = useState('vote');
  let display_page;
  
  if (page === 'vote') {
    display_page = <MainPage />
  }
  else if (page === 'results') {
    display_page = <ResultsPage />
  }
  else {
    display_page = <h1>ERROR!</h1>  // TODO - figure out what to render
  }

  return (
    <div>
      <div>
        <NavBar page={page} setPage={setPage} />
      </div>
      <div>
        {display_page}
      </div>
    </div>
  )
}
