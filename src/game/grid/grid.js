import times from 'lodash/times'
import get from 'lodash/get'
import flow from 'lodash/flow'
import over from 'lodash/over'
import property from 'lodash/fp/property'
import constant from 'lodash/constant'
import curry from 'lodash/curry'
import PF from 'pathfinding'

export const GridCodes = {
  CanStart: 1,
  Finish: 5
}

export const getCells = curry(({rows, cols}, value) => times(rows, () => times(cols, constant(value))))
export const mapGrid = curry((fn, cells) => cells.map((rows, y) => rows.map((cell, x) => fn(cell, x, y))))
export const mapPosition = curry((cellSize, {x, y}) => ({x: x / cellSize, y: y / cellSize}))

export const findPath = curry((from, to, cells) => {
  let finder = new PF.BestFirstFinder()
  let grid = new PF.Grid(cells)
  return finder.findPath(from.x, from.y, to.x, to.y, grid)
})

// //////////////////////////////////////////////
// Selectors

const gridFromState = state => get(state, 'grid', {})
const getDefFromState = flow(gridFromState, property('def'))

const setInputs = ({rows, cols}) => (cell, x, y) => x === 0 && y < rows ? GridCodes.CanStart : cell
const setOutput = cells => [
  ...cells.slice(0, cells.length - 1),
  [...cells.slice(-1)[0].slice(0, cells.slice(-1)[0].length - 1), GridCodes.Finish]
]

export const selectGridCellStates = flow( // TODO: Memoize this
  over(
    flow(gridFromState, property('cells')),
    flow(getDefFromState, property('input')),
    flow(getDefFromState, property('output'))
  ), ([cells, input, output]) => flow(
    mapGrid(constant(0)),
    mapGrid(setInputs(input)),
    setOutput
    // TODO: Add here all the following states, like belt, machine, etc
  )(cells)
)
