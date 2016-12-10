import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'


export const ChatList = () => (
  <div>
    <List>
      <Subheader>Current Conversations</Subheader>
      <ListItem
        primaryText="Brendan Lim"
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    <Divider />
  </div>
)

export default ChatList
