/* eslint-env jest */

import {
  getCells,
  drawCells,
  mapGrid,
  moveCellsIntoGrid
} from './grid'

describe('Grid', () => {
  let rows = 2
  let cols = 3
  let gridOf = getCells({rows, cols})

  describe('getCells', () => {
    it('should generate a grid by size', () => {
      expect(gridOf(0)).toEqual([
        [0, 0, 0],
        [0, 0, 0]
      ])
    })
  })

  describe('mapGrid', () => {
    it('should draw and return an svg rect collection', () => {
      let mockFn = jest.fn((value, x, y) => [value, x, y])

      let newGrid = mapGrid(mockFn, gridOf(-1))
      expect(mockFn.mock.calls.length).toBe(rows * cols)
      expect(newGrid).toEqual([
        [[-1, 0, 0], [-1, 1, 0], [-1, 2, 0]],
        [[-1, 0, 1], [-1, 1, 1], [-1, 2, 1]]
      ])
    })
  })

  describe('drawCells', () => {
    it('should draw and return an svg rect collection', () => {
      let cells = gridOf(0)
      let size = 20

      let rect = jest.fn(() => 1)
      let rects = drawCells(rect, size, cells)

      expect(rect.mock.calls.length).toBe(rows * cols)
      rect.mock.calls.forEach(([arg0, arg1]) => {
        expect(arg0).toBe(size)
        expect(arg1).toBe(size)
      })

      expect(rects).toEqual([
        [1, 1, 1],
        [1, 1, 1]
      ])
    })
  })

  describe('moveCellsIntoGrid', () => {
    it('should call move each cell by index position', () => {
      let cell = {move: jest.fn((x, y) => [x, y])}
      let rects = moveCellsIntoGrid(10, gridOf(cell))
      expect(rects).toEqual([
        [[0, 0], [10, 0], [20, 0]],
        [[0, 10], [10, 10], [20, 10]]
      ])
    })
  })
})
