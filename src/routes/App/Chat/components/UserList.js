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


export const UserList = () => (
  <List>
    <Subheader>Online Users</Subheader>
    <ListItem
      primaryText="Brendan Lim"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Eric Hoffman"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Grace Ng"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Kerem Suer"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Raquel Parrado"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Brendan Lim"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Eric Hoffman"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Grace Ng"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Kerem Suer"
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Raquel Parrado"
      leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Brendan Lim"
      leftAvatar={<Avatar src="images/ok-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Eric Hoffman"
      leftAvatar={<Avatar src="images/kolage-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Grace Ng"
      leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Kerem Suer"
      leftAvatar={<Avatar src="images/kerem-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
    <ListItem
      primaryText="Raquel Parrado"
      leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
      rightIconButton={rightIconMenu}
    />
  </List>
)

export default UserList
