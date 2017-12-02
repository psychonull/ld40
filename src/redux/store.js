import {combineReducers, createStore, compose} from 'redux'
import reducers from './reducers'

const composeEnhancers = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* options */}) : compose

const configureStore = (initialState = {}) => {
  return createStore(combineReducers(reducers), initialState, composeEnhancers())
}

export default configureStore
