import { Map, Record } from 'immutable'
import { browserHistory } from 'react-router'
import log from 'middleware/logger'
import { actions as Notification } from 'store/notification'
import fetch from 'isomorphic-fetch'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST'
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'
export const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE'
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_NOT_LOGGED_IN = 'AUTH_NOT_LOGGED_IN'


const Auth = new Record({
  isLoading: false,
  isAuthenticated: false,
  hasError: false,
  errors: null,
  username: undefined
})

export function receiveAuth() {
  const payload = {username: JSON.parse(sessionStorage.getItem('username'))}
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload
  }
}

export function authSignupRequest () {
  return {
    type: AUTH_SIGNUP_REQUEST
  }
}export function authSignupSuccess () {
  return {
    type: AUTH_SIGNUP_SUCCESS
  }
}
export function authLogoutRequest () {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}
export function authLogoutSuccess () {
  return {
    type: AUTH_LOGOUT_SUCCESS
  }
}
export function authLoginRequest (payload) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload
  }
}
export function authLoginSuccess (payload) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload
  }
}
export function authLoginFailure (payload) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload
  }
}

export function authNotLoggedIn (payload) {
  return {
    type: AUTH_NOT_LOGGED_IN,
    payload
  }
}

export function _removeUser () {
  sessionStorage.removeItem('username')
}

export function _storeUser (username) {
  if (username || username !== 'undefined') {
    sessionStorage.setItem('username', JSON.stringify(username))
  }
}

export const isAuthenticated = () => {
  console.log(localStorage.getItem('username'))
  return !!sessionStorage.getItem('username')
}

export const setup = () => {
  return (dispatch, getState) => {
    var username = JSON.parse(sessionStorage.getItem('username'))
    dispatch(authLoginSuccess({ username }))
  }
}

export const signup = (payload) => {
  return (dispatch, getState) => {
    dispatch(authSignupRequest(payload))
    return fetch('/api/signup', {
     method: 'post',
     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       username: payload.username,
       password: payload.password,
     })
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        log.debug('Auth::signup::checkStatus', response)
        sessionStorage.setItem('username', JSON.stringify(payload.username))
        dispatch(authSignupSuccess(payload))
        dispatch(browserHistory.push('/chat'))
      } else if (response.status === 401) {
        log.debug('Auth::signup::checkStatus', response)
        throw response
      } else {
        log.debug('Auth::signup::checkStatus', response)
        return response
      }
    })
    .catch((err) => {
      dispatch(authNotLoggedIn(err))
      if (err.status === 401) {
        dispatch(logout())
      }
      dispatch(Notification.emit({
        type: (err.type === 'ERROR') ? 'danger' : err.type,
        msg: err.msg,
        title: err.title || null,
        dissmisable: true
      }))
    })
  }
}

export const login = (payload) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest(payload))
    return fetch('/api/login', {
     method: 'post',
     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       username: payload.username,
       password: payload.password,
     })
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        log.debug('Auth::login::response', payload.username)
        sessionStorage.setItem('username', JSON.stringify(payload.username))
        dispatch(authLoginSuccess(payload))
        dispatch(browserHistory.push('/app'))
      } else if (response.status === 401) {
        log.debug('Auth::login::checkStatus', response)
        throw response
      } else {
        log.debug('Auth::login::checkStatus', response)
        return response
      }
    })
    .catch((err) => {
      dispatch(authNotLoggedIn(err))
      if (err.status === 401) {
        dispatch(logout())
      }
      dispatch(Notification.emit({
        type: (err.type === 'ERROR') ? 'danger' : err.type,
        msg: err.msg,
        title: err.title || null,
        dissmisable: true
      }))
    })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(authLogoutRequest())
    return fetch('/api/logout')
      .then(response => {
        if(response.ok) {
          cookie.remove('username')
          dispatch(authLogoutSuccess())
          browserHistory.push('/')
        }
      })
      .catch(error => {throw error});
  }
}

export const actions = {
  login,
  logout,
  setup,
  signup,
  isAuthenticated
}

const initialState = new Auth({
  isLoading: false,
  isAuthenticated: false,
  hasError: false,
  errors: [],
  username: undefined
})

const ACTION_HANDLERS = {
  [AUTH_LOGIN_REQUEST]: (state, { payload }) => {
    return state.set('isLoading', true)
  },
  [AUTH_LOGIN_SUCCESS]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('username', payload.username)
    .set('isAuthenticated', true)
  },
  [AUTH_LOGIN_FAILURE]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('hasError', true)
    .set('errors', payload)
  },
  [AUTH_SIGNUP_REQUEST]: (state, { payload }) => {
    return state.set('isLoading', true)
  },
  [AUTH_SIGNUP_SUCCESS]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('username', payload.username)
    .set('isAuthenticated', true)
  },
  [AUTH_SIGNUP_FAILURE]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('hasError', true)
    .set('errors', payload)
  },
  [AUTH_LOGOUT_SUCCESS]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('username', undefined)
    .set('isAuthenticated', false)
  }
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
