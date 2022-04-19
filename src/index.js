import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HeroProvider } from './context/context';
import './i18next';

ReactDOM.render(
  <HeroProvider>
    <App />
  </HeroProvider>,
  document.getElementById('root')
);
