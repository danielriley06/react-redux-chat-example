import React, { Component, PropTypes } from 'react'
import UserList from './UserList'
import ChatList from './ChatList'
import ConversationComposer from './ConversationComposer'
import * as authActions from 'store/auth'
import {List, ListItem} from 'material-ui/List'

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
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      privateChannelModal: false,
      targetedUser: ''
    }
  }
  componentDidMount() {
    const { socket, user, dispatch } = this.props;
    socket.emit('chat mounted', user);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
    socket.on('receive socket', socketID =>
      dispatch(authActions.receiveSocket(socketID))
    );
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  changeActiveChannel(channel) {
    const { socket, activeConversation, dispatch } = this.props;
    socket.emit('leave channel', activeConversation);
    socket.emit('join channel', channel);
    dispatch(actions.changeChannel(channel));
    dispatch(actions.fetchMessages(channel.name));
  }
  handleClickOnUser(user) {
    this.setState({ privateChannelModal: true, targetedUser: user });
  }
  closePrivateChannelModal(event) {
    event.preventDefault();
    this.setState({privateChannelModal: false});
  }
  handleSendDirectMessage() {
    const { dispatch, socket, conversations, user } = this.props;
    const doesPrivateChannelExist = conversations.filter(item => {
      return item.name === (`${this.state.targetedUser.username}+${user.username}` || `${user.username}+${this.state.targetedUser.username}`)
    })
    if (user.username !== this.state.targetedUser.username && doesPrivateChannelExist.length === 0) {
      const newChannel = {
        name: `${this.state.targetedUser.username}+${user.username}`,
        id: Date.now(),
        private: true,
        between: [this.state.targetedUser.username, user.username]
      };
      dispatch(actions.createChannel(newChannel));
      this.changeActiveChannel(newChannel);
      socket.emit('new private channel', this.state.targetedUser.socketID, newChannel);
    }
    if(doesPrivateChannelExist.length > 0) {
      this.changeActiveChannel(doesPrivateChannelExist[0]);
    }
    this.setState({ privateChannelModal: false, targetedUser: '' });
  }
  render() {
    const { messages, socket, conversations, activeConversation, typers, dispatch, user, screenWidth, users} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeConversation);
    const username = this.props.user.username;

    return (
      <div className='MainView'>
        <div className='ListView'>
          <div className='ChatList'>
            <ChatList />
          </div>
          <div className='UserList'>
            {Object.keys(users).map(function(key) {
              <div>
                <ListItem
                  key={users[key].id}
                  primaryText={users[key]['_id']}
                  rightIcon={<CommunicationChatBubble />}
                />
              </div>
            })}
          </div>
        </div>
        <div className='ActiveConversation'>
          <div className='ConversationHeader' />
          <div className='Conversation'>
            <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
                {filteredMessages.map(message =>
                  <MessageListItem handleClickOnUser={::this.handleClickOnUser} message={message} key={message.id} />
                )}
            </ul>
          </div>
          <ConversationComposer className='ConversationComposer' activeConversation={activeConversation} socket={socket} user={user} onSave={::this.handleSave}/>
        </div>
      </div>
    )
  }
}
