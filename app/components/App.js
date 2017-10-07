import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Popular from './Popular'
import Battle from './Battle'
import Results from './Results'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />

        <Switch>
          <Route exact path='/'
            component={Home} />
          <Route path='/popular'
            component={Popular} />
          <Route exact path='/battle'
            component={Battle} />
          <Route path='/battle/results'
            component={Results} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    )
  }
}

export default App
