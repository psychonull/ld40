import React from 'react'
import {connect} from 'react-redux'
import Shape from './ShapeComponent'
import {getCenterCell} from './grid'
import './Factory.css'

let FactoryContainer = ({shapes, cellSize, size}) =>
  <g className='Factory'>
    {shapes.map(({x, y, shape, i}) =>
      <Shape key={`s${x}${y}${i}`} shape={shape} {...getCenterCell(x * cellSize, y * cellSize, cellSize)} size={size} />)}
  </g>

FactoryContainer.displayName = 'FactoryContainer'

export default connect(
  state => ({
    shapes: state.factory.shapes,
    cellSize: state.grid.cellSize,
    size: state.grid.cellSize / 2
  })
)(FactoryContainer)
