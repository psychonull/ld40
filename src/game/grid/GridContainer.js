import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import GridComponent from './GridComponent'
import {mapPosition, mapGrid, findPath} from './grid'

let getControls = getState => getState().controls
let isDragActive = getState => getControls(getState).gridMouseDown

let getCellPosition = (e, getState) => {
  let cellEl = e.target
  if (!cellEl || cellEl.tagName.toLowerCase() !== 'rect') return {}
  return mapPosition(getState().grid.cellSize, {x: cellEl.getAttribute('x'), y: cellEl.getAttribute('y')})
}

let onMouseOver = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    let payload = getCellPosition(e, getState)

    if (payload) {
      let {gridMouseStartAt, gridMouseAt} = getControls(getState)
      if (isEqual(payload, gridMouseStartAt) || isEqual(payload, gridMouseAt)) return
      dispatch({
        type: 'GRID_UPDATE_PENDING_PATH',
        payload: findPath(gridMouseStartAt, payload, mapGrid(() => 0)(getState().grid.cells))
      })
      dispatch({type: 'GRID_MOUSE_DOWN_MOVE', payload})
    }
  }
}

let startDrag = e => (dispatch, getState) => {
  let payload = getCellPosition(e, getState)
  if (payload) {
    dispatch({type: 'GRID_MOUSE_DOWN_START', payload})
  }
}

let cancelDrag = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    dispatch({type: 'GRID_MOUSE_UP'})
    let payload = getCellPosition(e, getState)
    if (payload) {
      dispatch({type: 'GRID_MOUSE_DOWN_END', payload})
    }

    // TODO: Check store and apply Belt! or trash the current pendings

    /*
    dispatch({type: 'GRID_SET_BELT', payload: path})

    // OR

    dispatch({type: 'GRID_CLEAR_PENDING_BELT'})
    */
  }
}

export default connect(state => {
  let {def, cellSize, cells} = state.grid
  return {
    width: def.cells.cols * cellSize,
    height: def.cells.rows * cellSize,
    cells
  }
}, dispatch => ({
  onMouseDown: e => dispatch(startDrag(e)),
  onMouseOver: e => dispatch(onMouseOver(e)),
  onMouseUp: e => dispatch(cancelDrag(e)),
  onMouseLeave: e => dispatch(cancelDrag(e))
}))(GridComponent)
