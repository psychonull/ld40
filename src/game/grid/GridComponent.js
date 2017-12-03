import React from 'react'
import {mapGrid} from './grid'
import get from 'lodash/get'
import Cell from './GridCellComponent'
import Belts from './BeltsContainer'
import Factory from './FactoryContainer'

let GridComponent = ({width, height, cells, cellStates, dispatch, renderBelts, renderFactory, ...props}) =>
  <svg width={width} height={height} {...props}>
    {
      mapGrid((cell, x, y) =>
        <Cell key={`${x}-${y}`} x={x} y={y} {...cell} cellState={get(cellStates, `[${y}][${x}]`)} />)(cells)
    }
    {renderBelts && <Belts />}
    {renderFactory && <Factory />}
  </svg>

GridComponent.displayName = 'GridComponent'
export default GridComponent
