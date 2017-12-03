/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import {GUI} from './GUI'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<GUI />, div)
})
