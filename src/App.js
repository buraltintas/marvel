import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Pagination from './components/pagination/Pagination';
import LoadingSpinner from './components/loading/LoadingSpinner';

function App() {
  // initial states
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState();

  // fetch data from Marvel Api and store data in sessionStorage
  const getData = async (numberOfOffset) => {
    setLoading(true);
    const publicKey = '7cf5ee555c47a4c5e9ec988eb75a7861';
    const privateKey = '9f5c54d74bead24d3919d28f7a3a694bce705ee8';
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
    const limit = 20;
    const url =
      baseUrl +
      '?limit=' +
      limit +
      '&offset=' +
      numberOfOffset +
      '&ts=' +
      ts +
      '&apikey=' +
      publicKey +
      '&hash=' +
      hash;

    const res = await axios.get(url);

    setTotalPageNumber(res.data.data.total);

    if (res.status !== 200) {
      alert('Bir şeyler ters gitti, yeniden deneyin! :(');
    } else {
      setCharacters(res.data.data.results);

      setLoading(false);
    }

    // check if we have data for currentPage
    if (!sessionStorage.getItem(`page ${currentPage}`)) {
      sessionStorage.setItem(
        `page ${currentPage}`,
        JSON.stringify(res.data.data.results)
      );
    }
  };

  // this function gets new page number that user clicked as a parameter and check if sessionStorage has data of that page else set new offset to call getData func
  const nextPage = (num) => {
    if (sessionStorage.getItem(`page ${num}`)) {
      const charactersToRender = JSON.parse(
        sessionStorage.getItem(`page ${num}`)
      );

      setCharacters(charactersToRender);
    } else {
      setOffset((num - 1) * 20);
    }

    setCurrentPage(num);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // call getData function onload and if offset number changes call getData func again
  useEffect(() => {
    getData(offset);
  }, [offset]);

  return (
    <div className='App'>
      <Header />

      {loading && (
        <div className='loading'>
          <LoadingSpinner />
        </div>
      )}

      <Main loading={loading} characters={characters} />

      <Pagination
        currentPage={+currentPage}
        nextPage={nextPage}
        totalPageNumber={totalPageNumber}
        loading={loading}
      />
    </div>
  );
}

export default App;
