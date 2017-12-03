import React, { Component } from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import Grid from './grid/GridContainer'
import Input from './grid/InputContainer'
import Output from './grid/OutputContainer'
import factoryCycle from './grid/factoryCycle'
import './GameContainer.css'

export class GameContainer extends Component {
  constructor (props) {
    super(props)
    this.timer = null
  }

  componentDidMount () {
    // assuming gameplay starts when GameContainer is mounted
    this.factoryCycle()
  }

  componentWillReceiveProps ({factoryInterval, paused}) {
    if (factoryInterval !== this.props.factoryInterval || (paused !== this.props.paused && paused === false)) {
      this.factoryCycle()
    }
  }

  factoryCycle () {
    this.props.factoryCycle()

    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      if (this.props.paused) return
      this.factoryCycle()
    }, this.props.factoryInterval)
  }

  componentWillUnmount () {
    window.clearTimeout(this.timer)
  }

  render () {
    return (
      <div className='game-container'>
        <Input />
        <Grid renderBelts renderFactory />
        <Output />
      </div>
    )
  }
}

GameContainer.defaultProps = {
  factoryInterval: 2000
}

export default connect(state => ({
  paused: get(state, 'factory.paused', false)
}), dispatch => ({
  factoryCycle: () => dispatch(factoryCycle())
}))(GameContainer)
