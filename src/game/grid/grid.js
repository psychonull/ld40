import times from 'lodash/times'
import constant from 'lodash/constant'
import curry from 'lodash/curry'

// import PF from 'pathfinding'

export const getCells = curry(({rows, cols}, value) => times(rows, () => times(cols, constant(value))))
export const mapGrid = curry((fn, cells) => cells.map((rows, y) => rows.map((cell, x) => fn(cell, x, y))))
export const mapPosition = curry((cellSize, {x, y}) => ({x: x / cellSize, y: y / cellSize}))
// export const getPathFindingGrid = cells => (new PF.Grid(cells))
