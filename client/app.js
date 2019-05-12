import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import HistoryPage from './components/History'
import Items from './components/Items'
import Signup from './components/Signup'
import Upload from './components/Upload'
import {withFirebase} from './components/firebase'
import {ROUTES} from './constants'

const app = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={ROUTES.home}
          exact
          render={localProps => <Items {...localProps} />}
        />
        <Route
          path={ROUTES.signup}
          render={localProps => <Signup {...localProps} />}
        />
        <Route
          path={ROUTES.items}
          render={localProps => <Items {...localProps} />}
        />
        <Route
          path={ROUTES.upload}
          render={localProps => {
            const loggedin = props.firebase && props.firebase.currentUser
            if (loggedin) return <Upload {...localProps} />
            else return <Redirect to={{pathname: ROUTES.signup}} />
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
