import isEmpty from 'lodash/isEmpty'
import first from 'lodash/fp/first'
import {} from './grid'

let factoryCycle = () => (dispatch, getState) => {
  let {grid, factory} = getState()
  if (isEmpty(grid.belts)) return // Nothing to do in the factory

  // Move all current shapes 1 step
  dispatch({ // Temporal Test
    type: 'FACTORY_UPDATE_SHAPES',
    payload: factory.shapes.map(
      shape => ({...shape, x: shape.x + 1}))
  })

  // Create new shapes from Inputs
  let inputs = grid.belts.map(first).map(([x, y]) => ({x, y}))
  let newShapeInputs = inputs.map(({x, y}) => ({
    x,
    y,
    shape: grid.input[y][x].shape,
    inputIndex: [y][x]
  }))

  dispatch({type: 'FACTORY_ADD_SHAPES', payload: newShapeInputs})

  // Update stats like cycles++
  dispatch({type: 'FACTORY_CYCLE'})
  if (factory.stats.runs === 9) dispatch({type: 'FACTORY_RESET'})

  // Check Win/ Loose Game
}

export default factoryCycle
