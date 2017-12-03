import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import './Cell.css'

let GridCellComponent = ({x, y, cellSize, isBelt, isPreBelt, ...props}) =>
  <rect x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize}
    className={classnames('Cell', {isPreBelt, isBelt})} {...props} />

GridCellComponent.displayName = 'GridCellComponent'

export default connect(
  state => ({cellSize: state.grid.cellSize}),
  dispatch => ({})
)(GridCellComponent)
