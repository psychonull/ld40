/* eslint-env jest */

import {
  getCells,
  mapGrid,
  mapPosition
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

  describe('mapPosition', () => {
    it('should return a grid position of a cell from pixel coords', () => {
      let resolve = mapPosition(10)

      expect(resolve({x: 0, y: 0})).toEqual({x: 0, y: 0})
      expect(resolve({x: 20, y: 10})).toEqual({x: 2, y: 1})
      expect(resolve({x: 10, y: 20})).toEqual({x: 1, y: 2})
      expect(resolve({x: 10, y: 10})).toEqual({x: 1, y: 1})
    })
  })
})
