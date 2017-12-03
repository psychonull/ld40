import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {GridCodes, getCenterCell} from './grid'
import Shape from './ShapeComponent'
import './Cell.css'

let GridCellComponent = ({x, y, cellSize, hasBelt, isPreBelt, cellState, shape, ...props}) =>
  <g className='CellGroup'>
    <rect x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize}
      className={classnames('Cell', {
        isPreBelt,
        hasBelt,
        canStart: cellState === GridCodes.CanStart,
        isFinish: cellState === GridCodes.Finish
      })} {...props} />

    {shape && <Shape shape={shape} {...getCenterCell(x * cellSize, y * cellSize, cellSize)} size={cellSize / 2} />}
  </g>

GridCellComponent.displayName = 'GridCellComponent'

export default connect(
  state => ({
    cellSize: state.grid.cellSize
  }),
  dispatch => ({})
)(GridCellComponent)
