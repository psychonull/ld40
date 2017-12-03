import React, { Component } from 'react'

export default class Loading extends Component {
  render () {
    return (
      <div>
        LOADING... ({this.props.progress}%)
      </div>
    )
  }
}
