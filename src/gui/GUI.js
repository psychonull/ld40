import React, { Component } from 'react'
import {connect} from 'react-redux'
import './GUI.css'

export class GUI extends Component {
  render () {
    return (
      <div className='GUI'>
        <p className='GUI-intro'>
          [GUI]
        </p>
      </div>
    )
  }
}

export default connect(
  state => ({pos: state.position}),
  dispatch => ({
    left: () => dispatch({type: 'MOVE_LEFT'}),
    right: () => dispatch({type: 'MOVE_RIGHT'})
  })
)(GUI)
