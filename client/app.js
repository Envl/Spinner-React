import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HistoryPage from './History'
import Products from './Products'

class app extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HistoryPage} />
          <Route path='/products' component={Products} />
          <Route path='/upload' render={props => <Upload {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default app
