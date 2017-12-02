const MOVE = 100
const MIN = 0
const MAX = 1000

let position = (state = 100, action) => {
  switch (action.type) {
    case 'MOVE_LEFT': return state - MOVE < MIN ? MIN : state - MOVE
    case 'MOVE_RIGHT': return state + MOVE > MAX ? MAX : state + MOVE
    default:
      return state
  }
}

export default {
  position
}
