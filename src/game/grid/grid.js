import times from 'lodash/times'
import get from 'lodash/get'
import flow from 'lodash/flow'
import over from 'lodash/over'
import property from 'lodash/fp/property'
import constant from 'lodash/constant'
import curry from 'lodash/curry'
import PF from 'pathfinding'

export const Shapes = {
  Square: 10,
  Circle: 20,
  Triangle: 30
}

export const GridCodes = {
  CanStart: 1,
  Finish: 5,
  ...Shapes
}

// TODO: Remove this hardcode
export const nextShape = current => current + 10 > 20 ? 10 : current + 10

export const rectsCollide = (a, b) =>
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y

export const squaresCollide = (a, b, size) =>
  a.x < b.x + size && a.x + size > b.x && a.y < b.y + size && size + a.y > b.y

export const pointInSquare = (p, rect, size) =>
  p.x >= rect.x && p.x <= rect.x + size && p.y >= rect.y && p.y <= rect.y + size

export const getCells = curry(({rows, cols}, value) => times(rows, () => times(cols, constant(value))))
export const mapGrid = curry((fn, cells) => cells.map((rows, y) => rows.map((cell, x) => fn(cell, x, y))))

export const mapPosition = (cellSize, {x, y}) => ({
  x: Math.floor(x / cellSize),
  y: Math.floor(y / cellSize)
})

export const findPath = curry((from, to, cells) => {
  let finder = new PF.BestFirstFinder()
  let grid = new PF.Grid(cells)
  return finder.findPath(from.x, from.y, to.x, to.y, grid)
})

export const getCenterCell = (x, y, size) => ({cx: x + size / 2, cy: y + size / 2})
export const getStringPoints = (points = []) => points.reduce((all, [x, y]) => `${all} ${x},${y}`, '')

export const resolveEventPosition = (event, target) => {
  let {x, y} = target.getBoundingClientRect()
  let dx = 0
  let dy = 0

  if (event.pageX || event.pageY) {
    dx = event.pageX
    dy = event.pageY
  } else if (event.clientX || event.clientY) {
    dx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    dy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }

  return {x: dx - x, y: dy - y}
}

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
