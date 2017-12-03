import React, { Component } from 'react'
import './MainMenu.css'

export default class Loading extends Component {
  render () {
    return (
      <div className='main-menu'>
        <button onClick={this.props.onStartGame}>START GAME</button>
      </div>
    )
  }
}
