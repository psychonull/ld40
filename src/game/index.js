import SVG from 'svg.js'

let rect
let initGame = (initialState) => {
  // let viewport = document.getElementById('game-container')
  let draw = SVG('game-container').size(1000, 300)
  rect = draw.rect(initialState.position, 100).attr({fill: '#f06'})
}

let handleChange = ({getState, dispatch}) => () => {
  console.log('handleChange!')
  console.log(getState())

  rect.animate().move(getState().position)
}

export default store => {
  // eslint-disable-next-line no-unused-vars
  let unsuscribe = store.subscribe(handleChange(store))
  // unsuscribe()

  initGame(store.getState())
}
