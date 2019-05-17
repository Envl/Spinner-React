import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Items from './components/Items'
import Signup from './components/Signup'
import Upload from './components/Upload'
import HistoryPage from './components/HistoryPage'
import Homepage from './components/Homepage'
import MainPage from './components/MainPage'
import {withFirebase} from './components/firebase'
import {ROUTES} from './constants'
import NavBar from './components/NavBar'
import {CurrentUserGlobal} from './store'

const app = props => {
  const {currentUser, setCurrentUser} = CurrentUserGlobal.useContainer()
  props.firebase.auth.onAuthStateChanged(authUser => {
    console.log('on auth', authUser, '--------------------------', this)

    setCurrentUser(authUser)
  })

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route
          path={ROUTES.home}
          exact
          render={localProps => <MainPage {...localProps} />}
        />

        <Route
          path={ROUTES.signup}
          render={localProps => <Signup {...localProps} />}
        />
        <Route
          path={ROUTES.items}
          render={localProps => <MainPage {...localProps} />}
        />
        <Route
          path={ROUTES.upload}
          render={localProps => <Upload {...localProps} />}
        />
        <Route
          path={ROUTES.history}
          render={localProps => <HistoryPage {...localProps} />}
        />
        <Route
          path={ROUTES.homepage}
          render={localProps => <Homepage {...localProps} />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
