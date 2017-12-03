import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import GridComponent from './GridComponent'
import {mapPosition, mapGrid, findPath, selectGridCellStates, resolveEventPosition} from './grid'

let getControls = getState => getState().controls
let isDragActive = getState => getControls(getState).gridMouseDown

let onMouseOver = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    let payload = mapPosition(getState().grid.cellSize, resolveEventPosition(e.nativeEvent, e.currentTarget))

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
  let payload = mapPosition(getState().grid.cellSize, resolveEventPosition(e.nativeEvent, e.currentTarget))
  if (payload) {
    let cellStates = selectGridCellStates(getState())
    if (get(cellStates, `[${payload.y}][${payload.x}]`) === 1) {
      dispatch({type: 'GRID_MOUSE_DOWN_START', payload})
    }
  }
}

let cancelDrag = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    dispatch({type: 'GRID_MOUSE_UP'})
    let payload = mapPosition(getState().grid.cellSize, resolveEventPosition(e.nativeEvent, e.currentTarget))
    if (!payload) return

    let {gridMouseStartAt} = getControls(getState)

    // TODO: Is a valid Belt?
    dispatch({
      type: 'GRID_SET_BELT',
      payload: findPath(gridMouseStartAt, payload, mapGrid(() => 0)(getState().grid.cells))
    })

    dispatch({type: 'GRID_MOUSE_CLEAR_POSITIONS'})
  }
}

export default connect(state => {
  let {def, cellSize, cells} = state.grid
  return {
    width: def.cells.cols * cellSize,
    height: def.cells.rows * cellSize,
    cells,
    cellStates: selectGridCellStates(state)
  }
}, dispatch => ({
  onMouseDown: e => dispatch(startDrag(e)),
  onMouseOver: e => dispatch(onMouseOver(e)),
  onMouseUp: e => dispatch(cancelDrag(e)),
  onMouseLeave: e => dispatch(cancelDrag(e))
}))(GridComponent)
