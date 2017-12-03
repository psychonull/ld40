import React, { Component } from 'react'
import GameContainer from './game'
import Loading from './game/Loading'
import MainMenu from './game/MainMenu'
import GUI from './gui'
import './App.css'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    const Game = (
      <div className='game-wrapper'>
        <GUI />
        <GameContainer />
      </div>
    )

    if (this.props.status === 'LOADING') {
      return <Loading progress={this.props.progress} />
    } else if (this.props.status === 'MAINMENU') {
      return <MainMenu onStartGame={this.props.onStartGame} />
    }
    return Game
  }
}

export default connect(state => {
  const { status, level, loadingProgress } = state.gameState
  return {
    status,
    level,
    progress: loadingProgress
  }
}, dispatch => ({
  onStartGame: e => dispatch({ type: 'START_GAME' })
}))(App)
