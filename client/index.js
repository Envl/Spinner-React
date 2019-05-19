import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { CurrentUserGlobal, SelectedGeoLocationGlobal } from './store'
import './scss/main.scss'

ReactDOM.render(
  <CurrentUserGlobal.Provider>
    <SelectedGeoLocationGlobal.Provider>
      <App />
    </SelectedGeoLocationGlobal.Provider>
  </CurrentUserGlobal.Provider>,
  document.getElementById('root'),
)
