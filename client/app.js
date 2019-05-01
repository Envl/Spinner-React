import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

class app extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <h1>Hello!</h1>} />
          <Route
            path='/:sth'
            render={props => (
              <div {...props}>
                {' '}
                <h1>hello {props.match.params.sth} </h1>
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default app
