import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Items from './components/Items'
import Signup from './components/Signup'
import Upload from './components/Upload'
import HistoryPage from './components/HistoryPage'
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
          render={localProps => <Upload {...localProps} />}
        />
        <Route
          path={ROUTES.history}
          render={localProps => <HistoryPage {...localProps} />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
