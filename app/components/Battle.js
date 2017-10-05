import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={() => props.onReset(props.id)}
      >
        Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
}

class PlayerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const value = event.target.value

    this.setState({ username: value })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    const { label } = this.props
    const { username } = this.state

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, username) {
    this.setState(() => {
      const newState = {}
      newState[id + 'Name'] = username
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`
      return newState
    })
  }

  handleReset(id) {
    this.setState(() => {
      const newState = {}
      newState[id + 'Name'] = ''
      newState[id + 'Image'] = null
      return newState
    })
  }

  render() {
    const { match } = this.props
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state

    return (
      <div>
        <div className='row'>
          {!playerOneName
            ? <PlayerInput
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
              />
            : <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}
                onReset={this.handleReset}
                id='playerOne'
              />}

          {!playerTwoName
            ? <PlayerInput
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
              />
            : <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
                onReset={this.handleReset}
                id='playerTwo'
              />}
        </div>

        {playerOneName && playerTwoName &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle
