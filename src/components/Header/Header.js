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



export const Header = () => (
  <AppBar
    title='Slacker'
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
  />
)


export default Header
