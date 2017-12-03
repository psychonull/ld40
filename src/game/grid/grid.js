import times from 'lodash/times'
import constant from 'lodash/constant'
import curry from 'lodash/curry'
import PF from 'pathfinding'

export const getCells = curry(({rows, cols}, value) => times(rows, () => times(cols, constant(value))))
export const mapGrid = curry((fn, cells) => cells.map((rows, y) => rows.map((cell, x) => fn(cell, x, y))))
export const mapPosition = curry((cellSize, {x, y}) => ({x: x / cellSize, y: y / cellSize}))

export const findPath = curry((from, to, cells) => {
  let finder = new PF.BestFirstFinder()
  let grid = new PF.Grid(cells)
  return finder.findPath(from.x, from.y, to.x, to.y, grid)
})
