import {getCells, mapGrid, Shapes, nextShape} from '../game/grid/grid.js'

let def = {
  cells: {rows: 8, cols: 11},
  input: {rows: 3, cols: 1},
  output: {rows: 1, cols: 1}
}

let initialGrid = {
  cellSize: 80,
  def,
  cells: getCells(def.cells)({}),
  input: getCells(def.input)({shape: Shapes.Square}),
  output: getCells(def.output)({}),
  belts: []
}

let initialGameState = {
  status: 'PLAYING', // MAINMENU, PLAYING, LOADING
  level: 0,
  loadingProgress: 0
}

let gameState = (state = initialGameState, action) => {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    case 'START_GAME': return {...state, status: 'PLAYING'}
    case 'NEXT_LEVEL': return {...state, status: 'PLAYING', level: state.level + 1}
    default: return state
  }
}

let initialControls = {gridMouseDown: false}

let controls = (state = initialControls, action) => {
  switch (action.type) {
    case 'GRID_MOUSE_DOWN_START': return {...state, gridMouseDown: true, gridMouseStartAt: action.payload}
    case 'GRID_MOUSE_DOWN_MOVE': return {...state, gridMouseAt: action.payload}
    case 'GRID_MOUSE_DOWN_END': return {...state, gridMouseDown: false, gridMouseAt: action.payload}
    case 'GRID_MOUSE_CLEAR_POSITIONS': return initialControls
    default: return state
  }
}

let grid = (state = initialGrid, action) => {
  switch (action.type) {
    case 'GRID_SET_BELT': {
      return {...state,
        belts: [...state.belts, action.payload],
        cells: mapGrid(cell => ({...cell, isPreBelt: false}))(state.cells)
      }
    }
    case 'GRID_UPDATE_PENDING_PATH': {
      let newState = mapGrid(cell => ({...cell, isPreBelt: false}))(state.cells)
      action.payload.forEach(([y, x]) => {
        newState[x][y] = {...newState[x][y], isPreBelt: true}
      })
      return {...state, cells: newState}
    }
    case 'GRID_NEXT_INPUT_SHAPE': {
      return {...state,
        input: mapGrid((inputCell, x, y) =>
          action.payload.x === x && action.payload.y === y
            ? {...inputCell, shape: nextShape(inputCell.shape)} : inputCell
        )(state.input)}
    }
    default: return state
  }
}

let initialFactory = {
  paused: false,
  stats: {runs: 0},
  shapes: []
}

let factory = (state = initialFactory, action) => {
  switch (action.type) {
    case 'FACTORY_ADD_SHAPES': return {...state, shapes: [...state.shapes, ...action.payload]}
    case 'FACTORY_UPDATE_SHAPES': return {...state, shapes: action.payload}
    case 'FACTORY_CYCLE': return {...state, stats: {...state.stats, runs: state.stats.runs + 1}}
    case 'FACTORY_RESET': return initialFactory
    default: return state
  }
}

export default {
  gameState,
  controls,
  grid,
  factory
}
