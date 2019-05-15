import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Items from './components/Items'
import Signup from './components/Signup'
import Upload from './components/Upload'
import HistoryPage from './components/HistoryPage'
import { withFirebase } from './components/firebase'
import { ROUTES } from './constants'
import NavBar from './components/NavBar'
import { CurrentUserGlobal } from './store'

const app = props => {
  const { currentUser, setCurrentUser } = CurrentUserGlobal.useContainer()

  props.firebase.auth.onAuthStateChanged(authUser => {
    setCurrentUser(authUser)
  })

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path={ROUTES.home} exact render={localProps => <Items {...localProps} />} />
        <Route path={ROUTES.signup} render={localProps => <Signup {...localProps} />} />
        <Route path={ROUTES.items} render={localProps => <Items {...localProps} />} />
        <Route
          path={ROUTES.upload}
          render={localProps => {
            const loggedin = props.firebase && props.firebase.currentUser
            if (loggedin) return <Upload {...localProps} />
            else return <Redirect to={{ pathname: ROUTES.signup }} />
          }}
        />
        <Route
          path={ROUTES.history}
          render={localProps => {
            if (props.firebase && props.firebase.currentUser) {
              return <HistoryPage {...localProps} />
            } else {
              return <Redirect to={{ pathname: ROUTES.signup }} />
            }
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
