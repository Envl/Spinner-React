import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {
  CurrentUserGlobal,
  FirebaseDataGlobal,
  SelectedGeoLocationGlobal
} from './store'
import './scss/main.scss'

ReactDOM.render(
  <SelectedGeoLocationGlobal.Provider>
    <FirebaseDataGlobal.Provider>
      <CurrentUserGlobal.Provider>
        <App />
      </CurrentUserGlobal.Provider>
    </FirebaseDataGlobal.Provider>
  </SelectedGeoLocationGlobal.Provider>,
  document.getElementById('root')
)
