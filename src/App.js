import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css'

export class App extends Component {
  render () {
    return (
      <div className='App'>
        <p className='App-intro'>
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
)(App)
