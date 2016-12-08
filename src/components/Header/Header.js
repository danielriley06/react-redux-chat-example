import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import { Tabs, Tab } from 'material-ui/Tabs'

var styles = {
  appBar: {
    flexWrap: 'wrap',
    backgroundColor: '#2196F3'
  },
  tabs: {
    width: '100%'
  }
}

export const Header = () => (
  <AppBar
    title='Slacker'
    style={styles.appBar}
    showMenuIconButton={false}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText='Sign out' onTouchTap={() => signOut()} />
      </IconMenu>
    }
  >
    <Tabs style={styles.tabs} tabItemContainerStyle={{ backgroundColor: '#2196F3' }}>
      <Tab label='Lobby' containerElement={<IndexLink to='/' />} />
      <Tab label='Chats' containerElement={<Link to='/chat' />} />
    </Tabs>
  </AppBar>
)


export default Header
