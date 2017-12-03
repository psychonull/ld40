import {connect} from 'react-redux'
import GridComponent from './GridComponent'

export default connect(state => {
  let {def, cellSize, input} = state.grid
  return {
    className: 'Input',
    width: cellSize,
    height: def.input.rows * cellSize,
    cells: input
  }
})(GridComponent)
