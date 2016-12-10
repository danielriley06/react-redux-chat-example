import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Options"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Start Conversation</MenuItem>
    <MenuItem>Add To Current Conversation</MenuItem>
  </IconMenu>
)


export const UserList = ({user}) => (
  <ListItem
    key={user._id.toString()}
    primaryText={user.local.username}
    rightIconButton={rightIconMenu}
  />
)

export default UserList
