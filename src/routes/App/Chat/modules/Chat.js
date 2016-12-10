import { Map, Record } from 'immutable'
import * as types from 'store/conversations/constants/ActionTypes'
import log from 'middleware/logger'
import moment from 'moment'

const Chat = new Record({
  isLoading: false,
  hasError: false,
  errors: null,
  results: undefined
})

export const CHAT_LOADING = 'CHAT_LOADING'
export const CHAT_LOADED = 'CHAT_LOADED'

// ------------------------------------
// Actions
// ------------------------------------
function requestUsers() {
  return {
    type: types.LOAD_USERS
  }
}

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel
  };
}

function addChannel(channel) {
  return {
    type: types.ADD_CHANNEL,
    channel
  };
}

export function typing(username) {
  return {
    type: types.TYPING,
    username
  };
}

export function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}

export function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel
  };
}

// NOTE:Data Fetching actions

export function welcomePage(username) {
  return {
    type: types.SAVE_USERNAME,
    username
  };
}

export function fetchConversations(user) {
  return dispatch => {
    dispatch(requestChannels())
    return fetch(`/api/channels/${user}`)
      .then(response => response.json())
      .then(json => dispatch(receiveChannels(json)))
      .catch(error => {throw error});
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(`/api/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
      .catch(error => {throw error});
  }
}

function requestChannels() {
  return {
    type: types.LOAD_CHANNELS
  }
}

function receiveChannels(json) {
  return {
    type: types.LOAD_CHANNELS_SUCCESS,
    json
  }
}

function receiveUsers(json) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    json
  }
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages(channel) {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch(error => {throw error});
  }
}

function receiveMessages(json, channel) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  }
}

function shouldFetchMessages(state) {
  const messages = state.messages.data;
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(fetchMessages())
    }
  }
}

function loadingValidationList() {
  return {
    type: types.LOAD_USERVALIDATION
  }
}

function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json
  }
}

export function usernameValidationList() {
  return dispatch => {
    dispatch(loadingValidationList())
    return fetch('/api/all_usernames')
      .then(response => {
        return response.json()
    })
      .then(json => {
        return dispatch(receiveValidationList(json.map((item) => item.local.username)))
    })
      .catch(error => {throw error});
  }
}

export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)})
      .catch(error => {throw error});
  }
}

export function createChannel(channel) {
  return dispatch => {
    dispatch(addChannel(channel))
    return fetch ('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel)})
      .catch(error => {throw error});
  }
}

export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHAT_LOADING] : (state, action) => {
    return state.set('isLoading', true)
  },
  [CHAT_LOADED] : (state, action) => {
    return state
    .set('isLoading', false)
    .set('results', action.payload.results)
  }
}

const initialState = new Chat({
  isLoading: false,
  hasError: false,
  errors: null,
  results: []
})
export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
