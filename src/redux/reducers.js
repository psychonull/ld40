import {getCells, mapGrid} from '../game/grid/grid.js'

let def = {
  cells: {rows: 8, cols: 11},
  input: {rows: 3, cols: 1},
  output: {rows: 1, cols: 1}
}

let initialGrid = {
  cellSize: 80,
  def,
  cells: getCells(def.cells)({}),
  input: getCells(def.input)({}),
  output: getCells(def.output)({})
}

let gameState = (state = 'LOADING', action) => {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    default: return state
  }
}

let initialControls = {gridMouseDown: false}

let controls = (state = initialControls, action) => {
  switch (action.type) {
    case 'GRID_MOUSE_DOWN_START': return {...state, gridMouseDown: true, gridMouseStartAt: action.payload}
    case 'GRID_MOUSE_DOWN_MOVE': return {...state, gridMouseAt: action.payload}
    case 'GRID_MOUSE_DOWN_END': return {...state, gridMouseDown: false, gridMouseAt: action.payload}
    default: return state
  }
}

let grid = (state = initialGrid, action) => {
  switch (action.type) {
    case 'GRID_UPDATE_PENDING_PATH': {
      let newState = mapGrid(cell => ({...cell, isPreBelt: false}))(state.cells)
      action.payload.forEach(([y, x]) => {
        newState[x][y] = {...newState[x][y], isPreBelt: true}
      })
      return {...state, cells: newState}
    }
    default: return state
  }
}

export default {
  gameState,
  controls,
  grid
}
