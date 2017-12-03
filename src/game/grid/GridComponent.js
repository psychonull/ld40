import React from 'react'
import {mapGrid} from './grid'
import Cell from './GridCellComponent'

let GridComponent = ({width, height, cells, ...props}) =>
  <svg width={width} height={height} {...props}>
    {mapGrid((cell, x, y) => <Cell key={`${x}-${y}`} x={x} y={y} {...cell} />)(cells)}
  </svg>

GridComponent.displayName = 'GridComponent'
export default GridComponent
