import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Firebase, FirebaseContext} from './firebase';
import './scss/main.scss';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
