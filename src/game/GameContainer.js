import React, { Component } from 'react'
import Grid from './grid/GridContainer'
import './GameContainer.css'

export default class GameContainer extends Component {
  render () {
    return (
      <div className='game-container'>
        <Grid />
      </div>
    )
  }
}
