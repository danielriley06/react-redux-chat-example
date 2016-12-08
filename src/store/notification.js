import { List, Map, Record } from 'immutable'

import log from 'middleware/logger'

export const NOTIFY_EMIT = 'NOTIFY_EMIT'
export const NOTIFY_CLEAR = 'NOTIFY_CLEAR'
export const NOTIFY_HIDE = 'NOTIFY_HIDE'

const Notification = new Record({
  id: undefined,
  title: undefined,
  msg: '',
  visible: true,
  dismissable: true,
  type: 'info'
})

export function doHide (payload) {
  return {
    type: NOTIFY_HIDE,
    payload
  }
}
export function doClear (payload) {
  return {
    type: NOTIFY_CLEAR,
    payload
  }
}

export function doEmit (payload) {
  return {
    type: NOTIFY_EMIT,
    payload
  }
}

export const emit = (n) => {
  return (dispatch, getState) => {
    const notification = new Notification(n)
    dispatch(doEmit(notification))
  }
}

export const hide = (index) => {
  return (dispatch, getState) => {
    dispatch(doHide(index))
  }
}

export const clear = (index) => {
  return (dispatch, getState) => {
    dispatch(doClear(index))
  }
}
export const actions = {
  emit,
  hide,
  clear
}

const initialState = List([])

const ACTION_HANDLERS = {
  [NOTIFY_EMIT]: (state, { payload }) => {
    return state.push(Map(payload))
  },
  [NOTIFY_HIDE]: (state, { payload }) => {
    return state
    .map((n, i) => {
      if (i === payload) {
        return n.update('visible', visible => !visible)
      } else {
        return n
      }
    })
  },
  [NOTIFY_CLEAR]: (state, { payload }) => {
    return state.delete(payload)
  }
}

export default function notificationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
