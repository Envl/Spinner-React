import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HistoryPage from './components/History'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/Signup'

class app extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HistoryPage} />
          <Route path='/login' render={props => <Login {...props} />} />
          <Route path='/signup' render={props => <Signup {...props} />} />
          <Route path='/products' component={Products} />
          <Route path='/upload' render={props => <Upload {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default app
