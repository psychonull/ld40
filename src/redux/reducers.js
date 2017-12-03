import {getCells, mapGrid} from '../game/grid/grid.js'

let emptyCell = {
  // x: 0,
  // y: 0,
  // width: 0,
  // height: 0,
  // style: {
  //   fill: '#333',
  //   stroke: '#555'
  // }
}

let initialGrid = {
  cellSize: 80,
  rows: 8,
  cols: 10,
  cells: getCells({rows: 8, cols: 10})(emptyCell)
}

let gameState = (state = 'LOADING', action) => {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    default: return state
  }
}

/*
let cell = (state = emptyCell, action) => {
  switch (action.type) {
    default: return state
  }
}
*/

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
    case 'GRID_SET_PENDING': return {...state, cells: action.payload}
    /*
    case 'GRID_SET_PENDING': return {...state,
      cells: mapGrid((cell, x, y) =>
        action.payload.x === x && action.payload.y === y ? {...cell, isPreBelt: true} : cell,
        state.cells)
    }
    */
    default: return state
  }
}

export default {
  gameState,
  controls,
  grid
}
