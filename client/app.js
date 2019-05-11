import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import HistoryPage from './components/History'
import Products from './components/Products'
import Signup from './components/Signup'
import Upload from './components/Upload'
import {withFirebase} from './components/firebase'
import {ROUTES} from './constants'

const app = ({firebase}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={ROUTES.home}
          exact
          render={() => <Products {...props} />}
        />
        <Route path={ROUTES.signup} render={props => <Signup {...props} />} />
        <Route path={ROUTES.items} component={Products} />
        <Route
          path={ROUTES.upload}
          render={props => {
            const loggedin = firebase.currentUser
            if (loggedin) return <Upload {...props} />
            else return <Redirect to={{pathname: ROUTES.signup}} />
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default withFirebase(app)
