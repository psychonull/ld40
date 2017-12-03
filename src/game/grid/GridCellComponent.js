import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {GridCodes} from './grid'
import './Cell.css'

let GridCellComponent = ({x, y, cellSize, isBelt, isPreBelt, cellState, ...props}) =>
  <rect x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize}
    className={classnames('Cell', {
      isPreBelt,
      isBelt,
      canStart: cellState === GridCodes.CanStart
    })} {...props} />

GridCellComponent.displayName = 'GridCellComponent'

export default connect(
  state => ({
    cellSize: state.grid.cellSize
  }),
  dispatch => ({})
)(GridCellComponent)
