/* eslint-env jest */

import * as gridUtils from './grid'

describe('Grid', () => {
  let rows = 2
  let cols = 3
  let gridOf = gridUtils.getCells({rows, cols})

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

      let newGrid = gridUtils.mapGrid(mockFn, gridOf(-1))
      expect(mockFn.mock.calls.length).toBe(rows * cols)
      expect(newGrid).toEqual([
        [[-1, 0, 0], [-1, 1, 0], [-1, 2, 0]],
        [[-1, 0, 1], [-1, 1, 1], [-1, 2, 1]]
      ])
    })
  })

  describe('mapPosition', () => {
    it('should return a grid position of a cell from pixel coords', () => {
      let resolve = gridUtils.mapPosition(10)

      expect(resolve({x: 0, y: 0})).toEqual({x: 0, y: 0})
      expect(resolve({x: 20, y: 10})).toEqual({x: 2, y: 1})
      expect(resolve({x: 10, y: 20})).toEqual({x: 1, y: 2})
      expect(resolve({x: 10, y: 10})).toEqual({x: 1, y: 1})
    })
  })

  describe('getCenterCell', () => {
    it('should return a centered position inside a cell', () => {
      expect(
        gridUtils.getCenterCell(100, 200, 500)
      ).toEqual({cx: 350, cy: 450})
    })
  })

  describe('getStringPoints', () => {
    it('should return an string representation of a points array for svg', () => {
      expect(
        gridUtils.getStringPoints([[1, 0], [10, 80], [59, 15]])
      ).toEqual(' 1,0 10,80 59,15')
    })
  })
})

describe('Selectors', () => {
  let def = {
    cells: {rows: 4, cols: 5},
    input: {rows: 4, cols: 1},
    output: {rows: 1, cols: 1}
  }

  let getState = () => ({
    grid: {
      cellSize: 80,
      def,
      cells: gridUtils.getCells(def.cells)({}),
      input: gridUtils.getCells(def.input)({}),
      output: gridUtils.getCells(def.output)({})
    }
  })

  describe('selectGridCellStates', () => {
    let result = gridUtils.selectGridCellStates(getState())
    expect(result).toEqual([
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 5]
    ])
  })
})
