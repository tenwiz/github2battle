import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
// import PlayerPreview from './PlayerPreview'

import * as api from '../utils/api'

class Results extends Component {
  componentDidMount() {
    api.battle([
      'martian2lee',
      'tyler'
    ]).then(players => {
      console.log(players)
    })
  }

  render() {
    return (
      <div>
        Results!
      </div>
    )
  }
}

export default Results
