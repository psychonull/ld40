import React from 'react'
import {connect} from 'react-redux'
import {Shapes} from './grid'
import './Shape.css'

let getShape = ({shape, cx, cy, size}) => {
  switch (shape) {
    case Shapes.Square: return <rect className='Shape' x={cx - (size / 2)} y={cy - (size / 2)} width={size} height={size} />
    case Shapes.Circle: return <circle className='Shape' cx={cx} cy={cy} r={size / 2} />
    // case Shapes.Triangle: <polygon className='Shape' points={} />
    default: return null
  }
}

let ShapeComponent = ({shape, cx, cy, size}) =>
  <g>
    {getShape({shape, cx, cy, size})}
  </g>

ShapeComponent.displayName = 'ShapeComponent'

export default connect(
  state => ({
    cellSize: state.grid.cellSize
  })
)(ShapeComponent)
