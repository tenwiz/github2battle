import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/popular' component={Popular} />
          <Route render={() => {
            return <p>Not Found</p>
          }} />
        </Switch>
      </div>
    )
  }
}

export default App
