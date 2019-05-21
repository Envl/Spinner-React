import React, {useEffect, useState} from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Signup from './components/Signup'
import LandingPage from './components/LandingPage'
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
  console.log('aaappapappapa')

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      // console.log('on auth', authUser, '--------------------------')
      setCurrentUser(authUser)
      authUser &&
        props.firebase
          .user(authUser.uid)
          .get()
          .then(u => {
            console.log('000000000000')
            setCurrentUser({...authUser, points: u.data().points})
          })
    })
  }, [])

  const WithNavBar = Component => (
    <>
      <NavBar />
      {Component}
    </>
  )

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={ROUTES.landing}
          render={localProps => <LandingPage {...localProps} />}
        />

        <Route
          path={ROUTES.signup}
          render={localProps => WithNavBar(<Signup {...localProps} />)}
        />
        <Route
          path={'/'}
          exact
          render={localProps => WithNavBar(<MainPage {...localProps} />)}
        />
        <Route
          path={ROUTES.upload}
          render={localProps => WithNavBar(<Upload {...localProps} />)}
        />
        <Route
          path={ROUTES.history}
          render={localProps => WithNavBar(<HistoryPage {...localProps} />)}
        />
        <Route
          path={ROUTES.homepage}
          render={localProps => WithNavBar(<Homepage {...localProps} />)}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
