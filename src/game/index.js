import noop from 'lodash/noop'
import flow from 'lodash/flow'
import SVG from 'svg.js'

import {
  getCells,
  drawCells,
  mapGrid,
  moveCellsIntoGrid
} from './grid'

let initGame = (initialState) => {
  let cellSize = 20
  let width = 500
  let height = 500
  let gridOf = getCells({rows: width / cellSize, cols: height / cellSize})

  let draw = SVG('game-container').size(width, height)

  flow(
    drawCells(draw.rect.bind(draw), cellSize),
    mapGrid(cell => cell.fill('#f06').stroke('#333')),
    moveCellsIntoGrid(cellSize)
  )(gridOf(noop()))
}

let handleChange = ({getState, dispatch}) => () => {
  console.log('handleChange!')
  console.log(getState())
}

export default store => {
  // eslint-disable-next-line no-unused-vars
  let unsuscribe = store.subscribe(handleChange(store))
  // unsuscribe()

  initGame(store.getState())
}
