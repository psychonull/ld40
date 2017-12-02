let initialGrid = {
  cellSize: 80,
  rows: 8,
  cols: 10
}

let gameState = (state = 'LOADING', action) => {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    default: return state
  }
}

let grid = (state = initialGrid, action) => {
  switch (action.type) {
    default: return state
  }
}

export default {
  gameState,
  grid
}
