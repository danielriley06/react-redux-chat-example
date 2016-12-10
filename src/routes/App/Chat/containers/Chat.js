import React, { Component, PropTypes } from 'react'
import * as actions from '../modules/Chat'
import {receiveAuth} from 'store/auth'
import Chat from '../components/Chat'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('', { path: '/api/chat' })
const initialConversation = 'Lobby' // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, user } = this.props
    if(!user.username) {
      dispatch(receiveAuth())
    }
    dispatch(actions.fetchUsers())
    dispatch(actions.fetchMessages(initialConversation))
    dispatch(actions.fetchConversations(user.username))
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    )
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
  activeConversation: PropTypes.string.isRequired,
  typers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
      messages: state.conversations.messages.data,
      conversations: state.conversations.conversations.data,
      activeConversation: state.conversations.activeConversation.name,
      user: state.auth.username,
      typers: state.conversations.typers,
      screenWidth: state.conversations.environment.screenWidth,
      users: state.conversations.users.data
  }
}
export default connect(mapStateToProps)(ChatContainer)
