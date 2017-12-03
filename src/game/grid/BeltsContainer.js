import React from 'react'
import {connect} from 'react-redux'
import curry from 'lodash/curry'
import flow from 'lodash/flow'
import uniqueId from 'lodash/uniqueId'
import {getStringPath} from './grid'
import roundPathCorners from './pathRound'
import './Belts.css'

let roundCorners = curry((radius, stringPath) => roundPathCorners(stringPath, radius))
let toWorldPoints = curry((cellSize, size, points) => points.map(([x, y]) => [(x * cellSize) + size, (y * cellSize) + size]))
let getPath = (cellSize, size) => flow(toWorldPoints(cellSize, size), getStringPath, roundCorners(20))

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
