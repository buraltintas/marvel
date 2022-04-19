import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HeroProvider } from './context/context';
import { BrowserRouter } from 'react-router-dom';
import './i18next';

ReactDOM.render(
  <BrowserRouter>
    <HeroProvider>
      <App />
    </HeroProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
