import { combineReducers } from 'redux'
import locationReducer from './location'
import notificationReducer from './notification'
import authReducer from './auth'
import chatReducer from './conversations/reducers/index'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authReducer,
    notification: notificationReducer,
    conversations: chatReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
