import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Pagination from './components/pagination/Pagination';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async (numberOfOffset) => {
    setLoading(true);
    const publicKey = '7cf5ee555c47a4c5e9ec988eb75a7861';
    const privateKey = '9f5c54d74bead24d3919d28f7a3a694bce705ee8';
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const baseUrl = 'http://gateway.marvel.com/v1/public/characters';
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

    if (res.status !== 200) {
      alert('Something went wrong! Try again!');
    } else {
      setCharacters(res.data.data.results);

      setLoading(false);
    }

    if (JSON.parse(sessionStorage.getItem('characters'))) {
      const charactersInStorage = JSON.parse(
        sessionStorage.getItem('characters')
      );
      charactersInStorage.push(...res.data.data.results);
      sessionStorage.setItem('characters', JSON.stringify(charactersInStorage));
    } else {
      sessionStorage.setItem(
        'characters',
        JSON.stringify(res.data.data.results)
      );
    }
  };

  const nextPage = (num) => {
    if (
      JSON.parse(sessionStorage.getItem('characters')) &&
      JSON.parse(sessionStorage.getItem('characters')).length >= num * 20
    ) {
      const charactersInStorage = JSON.parse(
        sessionStorage.getItem('characters')
      );
      const charactersToRender = charactersInStorage.slice(
        (num - 1) * 20,
        (num - 1) * 20 + 20
      );

      setCharacters(charactersToRender);
      setCurrentPage(num);
    } else {
      setOffset((x) => x + 20);
      setCurrentPage(num);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getData(offset);
  }, [offset]);

  return (
    <div className='App'>
      <Header />

      <Main loading={loading} characters={characters} />
      <Pagination
        currentPage={+currentPage}
        nextPage={nextPage}
        loading={loading}
      />
    </div>
  );
}

export default App;
