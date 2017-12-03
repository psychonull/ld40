import {connect} from 'react-redux'
import GridComponent from './GridComponent'

export default connect(state => {
  let {cellSize, output, def} = state.grid
  return {
    className: 'Output',
    width: cellSize,
    height: def.output.rows * cellSize,
    cells: output
  }
})(GridComponent)
