import React from 'react'
import {connect} from 'react-redux'
import curry from 'lodash/curry'
import flow from 'lodash/flow'
import uniqueId from 'lodash/uniqueId'
import {getLinePath} from './path'
import './Belts.css'

let toWorldPoints = curry((cellSize, size, points) => points.map(([x, y]) => [(x * cellSize) + size, (y * cellSize) + size]))
let getPath = (cellSize, size) => flow(toWorldPoints(cellSize, size), getLinePath) // getSmoothPath

let svgPath = routePath => <path key={uniqueId()} d={routePath} className='Belt' />
let createBelt = (cellSize, size) => flow(getPath(cellSize, size), svgPath)

let BeltsContainer = ({belts, cellSize, size}) =>
  <g className='Belts'>
    {belts.map(createBelt(cellSize, size))}
  </g>

BeltsContainer.displayName = 'BeltsContainer'

export default connect(
  state => ({
    belts: state.grid.belts,
    cellSize: state.grid.cellSize,
    size: state.grid.cellSize / 2
  })
)(BeltsContainer)
