import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Hero from '../components/hero/Hero';
import Header from '../components/header/Header';
import SearchBar from '../components/searchbar/SearchBar';

const Router = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Hero />} />
      </Routes>
    </>
  );
};

export default Router;
