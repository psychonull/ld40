import React, { Component } from 'react'
import Grid from './grid/GridContainer'
import Input from './grid/InputContainer'
import Output from './grid/OutputContainer'
import './GameContainer.css'

export default class GameContainer extends Component {
  render () {
    return (
      <div className='game-container'>
        <Input />
        <Grid renderBelts />
        <Output />
      </div>
    )
  }
}
