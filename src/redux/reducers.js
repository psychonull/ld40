let rnds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RANDOM':
      return state.concat([action.text])
    default:
      return state
  }
}

export default {
  rnds
}
