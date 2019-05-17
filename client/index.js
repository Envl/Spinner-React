import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {CurrentUserGlobal, FirebaseDataGlobal} from './store'
import './scss/main.scss'

ReactDOM.render(
  <FirebaseDataGlobal.Provider>
    <CurrentUserGlobal.Provider>
      <App />
    </CurrentUserGlobal.Provider>
  </FirebaseDataGlobal.Provider>,
  document.getElementById('root')
)
