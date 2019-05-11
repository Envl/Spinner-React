import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import HistoryPage from './History';

class app extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HistoryPage} />
          <Route
            path="/:sth"
            render={props => (
              <div {...props}>
                {' '}
                <h1>hello {props.match.params.sth} !</h1>
              </div>
            )}
          />
          <Route path="/upload" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default app;
