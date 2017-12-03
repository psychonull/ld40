import {connect} from 'react-redux'
import GridComponent from './GridComponent'
import {mapPosition} from './grid'

let isDragActive = getState => getState().controls.gridMouseDown
let setPending = (e, dispatch, getState) => {
  let cellEl = e.target
  if (!cellEl || cellEl.tagName.toLowerCase() !== 'rect') return

  let {cellSize} = getState().grid
  let x = cellEl.getAttribute('x')
  let y = cellEl.getAttribute('y')

  dispatch({type: 'GRID_SET_PENDING', payload: mapPosition(cellSize, {x, y})})
}

let onMouseOver = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    setPending(e, dispatch, getState)
  }
}

let startDrag = () => dispatch => dispatch({type: 'GRID_MOUSE_DOWN'})
let cancelDrag = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    dispatch({type: 'GRID_MOUSE_UP'})
    setPending(e, dispatch, getState)
    // TODO: Check store and apply Belt! or trash the current pendings
  }
}

export default connect(state => {
  let {rows, cols, cellSize, cells} = state.grid
  return {
    width: cols * cellSize,
    height: rows * cellSize,
    cells
  }
}, dispatch => ({
  onMouseDown: e => dispatch(startDrag(e)),
  onMouseOver: e => dispatch(onMouseOver(e)),
  onMouseUp: e => dispatch(cancelDrag(e)),
  onMouseLeave: e => dispatch(cancelDrag(e))
}))(GridComponent)
