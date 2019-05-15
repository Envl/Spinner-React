import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { CurrentUserGlobal } from './store'
import './scss/main.scss'

ReactDOM.render(
  <CurrentUserGlobal.Provider>
    <App />
  </CurrentUserGlobal.Provider>,
  document.getElementById('root'),
)
