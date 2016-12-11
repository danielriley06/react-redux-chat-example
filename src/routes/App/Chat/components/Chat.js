import React, { Component, PropTypes } from 'react'
import UserList from './UserList'
import ChatList from './ChatList'
import ConversationComposer from './ConversationComposer'
import * as authActions from 'store/auth'
import * as actions from '../modules/chat'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,
    activeConversation: PropTypes.string.isRequired,
    typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      targetedUser: ''
    }
  }
  componentDidMount() {
    const { socket, user, dispatch } = this.props
    socket.emit('chat mounted', user)
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    )
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    )
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    )
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    )
    socket.on('receive socket', socketID =>
      dispatch(authActions.receiveSocket(socketID))
    )
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    )
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList
    messageList.scrollTop = messageList.scrollHeight
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage))
    }
  }
  handleSignOut() {
    const { dispatch } = this.props
    dispatch(authActions.signOut())
  }
  changeActiveConversation(channel) {
    const { socket, activeConversation, dispatch } = this.props
    socket.emit('leave channel', activeConversation)
    socket.emit('join channel', channel)
    dispatch(actions.changeChannel(channel))
    dispatch(actions.fetchMessages(channel.name))
  }

  handleStartConversation(target) {
    this.setState({ targetedUser: target })
    const { dispatch, socket, conversations, user } = this.props
    const doesConversationExist = conversations.filter(item => {
      return item.subscribers.indexOf(`${this.state.targetedUser.username}`) && item.subscribers.indexOf(`${user.username}`)
    })
    if (user.username !== this.state.targetedUser.username && doesConversationExist.length === 0) {
      const newConversation = {
        id: Date.now(),
        subscribers: [this.state.targetedUser.username, user.username]
      }
      dispatch(actions.createConversation(newConversation))
      this.changeActiveConversation(newConversation)
      socket.emit('new private channel', this.state.targetedUser.socketID, newChannel)
    }
    if(doesConversationExist.length > 0) {
      this.changeActiveConversation(doesConversationExist[0])
    }
    this.setState({ targetedUser: '' })
  }
  render() {
    const { messages, socket, conversations, activeConversation, typers, dispatch, user, screenWidth, users } = this.props


    return (
      <div className='MainView'>
        <div className='ListView'>
          <div className='ChatList'>
            <ChatList />
          </div>
          <div className='UserList'>
            <Subheader>All Users</Subheader>
            {users.map((user, index) => (
              <div>
                <UserList user={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='ActiveConversation'>
          <div className='ConversationHeader' />
          <div className='Conversation'>
            <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">

            </ul>
          </div>
          <ConversationComposer className='ConversationComposer' activeConversation={activeConversation} socket={socket} user={user} onSave={::this.handleSave}/>
        </div>
      </div>
    )
  }
}
