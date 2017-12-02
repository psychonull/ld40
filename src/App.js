import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <span>Last Rnd: </span>{this.props.test || 'none'}<br/><br/>
          <a onClick={() => this.props.onClick(Math.random())}>Click me!</a>
        </p>
      </div>
    );
  }
}

export default connect(
  state => ({test: state.rnds[state.rnds.length-1]}),
  dispatch => ({onClick: text => dispatch({type: 'ADD_RANDOM', text})})
)(App);
