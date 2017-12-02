import React, { Component } from 'react'
import {connect} from 'react-redux'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className="App-intro">
          <span>Current POS: {this.props.pos}</span><br/>
          <a onClick={this.props.left}>Move LEFT</a><br/>
          <a onClick={this.props.right}>Move RIGHT</a><br/>
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
