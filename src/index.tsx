import ReactDOM from 'react-dom';
import App from './App';
import './config/configureMobX';
import React from 'react';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter basename='/'>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept();
}