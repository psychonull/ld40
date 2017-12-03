import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* options */}) : compose

const configureStore = (initialState = {}) => {
  return createStore(combineReducers(reducers), initialState, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore
