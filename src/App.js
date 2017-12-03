import React, { Component } from 'react'
import GameContainer from './game'
import GUI from './gui'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='game-wrapper'>
        <GUI />
        <GameContainer />
      </div>
    )
  }
}

export default App
