import messages from './messages'
import conversations from './conversations'
import activeConversation from './activeConversation'
import auth from './auth'
import typers from './typers'
import userValidation from './userValidation'
import environment from './environment'
import {combineReducers} from 'redux'

const chatReducer = combineReducers({
  messages,
  conversations,
  activeConversation,
  auth,
  typers,
  userValidation,
  environment
})

export default chatReducer
