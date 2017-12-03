import {connect} from 'react-redux'
import GridComponent from './GridComponent'
import {mapPosition, resolveEventPosition} from './grid'

let changeShape = e => (dispatch, getState) => {
  let position = mapPosition(getState().grid.cellSize, resolveEventPosition(e.nativeEvent, e.currentTarget))
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
