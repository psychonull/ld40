import {connect} from 'react-redux'
import GridComponent from './GridComponent'
import {mapPosition, mapGrid} from './grid'
import PF from 'pathfinding'

let isDragActive = getState => getState().controls.gridMouseDown
let getCellPosition = (e, getState) => {
  let cellEl = e.target
  if (!cellEl || cellEl.tagName.toLowerCase() !== 'rect') return {}

  let {cellSize} = getState().grid
  let x = cellEl.getAttribute('x')
  let y = cellEl.getAttribute('y')
  return mapPosition(cellSize, {x, y})
}

let onMouseOver = e => (dispatch, getState) => {
  if (isDragActive(getState)) {
    let payload = getCellPosition(e, getState)
    if (payload) {

      let startAt = getState().controls.gridMouseStartAt || {}
      let lastAt = getState().controls.gridMouseAt || {}
      if (startAt.x === payload.x && startAt.y === payload.y && lastAt.x === payload.x && lastAt.y === payload.y) {
        return
      }

      dispatch({type: 'GRID_MOUSE_DOWN_MOVE', payload})

      let cells = mapGrid(() => 0)(getState().grid.cells)
      var finder = new PF.BestFirstFinder()
      var grid = new PF.Grid(cells)

      var path = finder.findPath(startAt.x, startAt.y, payload.x, payload.y, grid)
      let update = mapGrid(cell => ({...cell, isPreBelt: false}))(getState().grid.cells)
      path.forEach(([y, x]) => {
        update[x][y] = {...update[x][y], isPreBelt: true}
      })
      dispatch({type: 'GRID_SET_PENDING', payload: update})
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
    let grid = new PF.Grid(getState().grid.cells)
    var finder = new PF.AStarFinder()
    var path = finder.findPath(startAt.x, startAt.y, payload.x, payload.y, grid)
    dispatch({type: 'GRID_SET_BELT', payload: path})

    // OR

    dispatch({type: 'GRID_CLEAR_PENDING_BELT'})
    */
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
