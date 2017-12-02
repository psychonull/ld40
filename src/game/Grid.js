import times from 'lodash/times'
import constant from 'lodash/constant'
import curry from 'lodash/curry'

export const getCells = curry(({rows, cols}, value) => times(rows, () => times(cols, constant(value))))
export const mapGrid = curry((fn, cells) => cells.map((rows, y) => rows.map((cell, x) => fn(cell, x, y))))

export const drawCells = curry((draw, size, cells) => mapGrid(() => draw(size, size), cells))
export const moveCellsIntoGrid = curry((size, cells) => mapGrid((cell, x, y) => cell.move(x * size, y * size), cells))
