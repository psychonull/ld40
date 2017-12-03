import {connect} from 'react-redux'
import GridComponent from './GridComponent'
import {mapPosition2} from './grid'

let changeShape = e => (dispatch, getState) => {
  let event = e.nativeEvent
  let {grid} = getState()

  let {x, y} = e.currentTarget.getBoundingClientRect()
  let dx = 0
  let dy = 0

  if (event.pageX || event.pageY) {
    dx = event.pageX
    dy = event.pageY
  } else if (event.clientX || event.clientY) {
    dx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    dy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }

  let position = mapPosition2(grid.cellSize, grid.cells, {x: dx - x, y: dy - y})
  dispatch({type: 'GRID_NEXT_INPUT_SHAPE', payload: position})
}

export default connect(state => {
  let {def, cellSize, input} = state.grid
  return {
    className: 'Input',
    width: cellSize,
    height: def.input.rows * cellSize,
    cells: input
  }
}, dispatch => ({
  onClick: e => dispatch(changeShape(e))
}))(GridComponent)
