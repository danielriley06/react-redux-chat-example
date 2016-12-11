import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import log from 'middleware/logger'

/* eslint-disable no-unused-vars */
import styles from './login.scss'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { orange500, blue500 } from 'material-ui/styles/colors'
/* eslint-enable no-unused-vars */

export default class LoginView extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    doLogin: PropTypes.func.isRequired,
    doSignup: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      loginType: 'local'
    }
  }

  _handleLogin = (event) => {
    event.preventDefault()
    const username = this.refs.username.getValue()
    const password = this.refs.password.getValue()
    log.debug('_handleLogin() ::', username, password)
    const user = {
      username,
      password
    }
    log.debug('_handleLogin() ::', user)
    this.props.doLogin(user)
  }

  _handleSignup = (event) => {
    event.preventDefault()
    const username = this.refs.username.getValue()
    const password = this.refs.password.getValue()
    log.debug('_handleSignup() ::', username, password)
    const user = {
      username,
      password
    }
    log.debug('_handleSignup() ::', user)
    this.props.doSignup(user)
  }

  render () {
    const { auth } = this.props

    const styles = {
      textFieldStyle: {
        width: '90%',
        paddingLeft: '5%'
      },
      loginStyle: {
        marginTop: 24,
        padding: 12
      },
      signupStyle: {
        padding: 12
      },
      underlineStyle: {
        borderColor: orange500
      }
    }

    return (
      <Card style={{ width: '450px' }}>
        <CardHeader
          title='Welcome to Slacker'
          subtitle='A chat application built using React + Redux, Socket.io, with a little MaterialUI goodness sprinkled in. To get started either sign in or create an account below!'
        />
        <TextField
          floatingLabelText='Enter or create a username'
          style={styles.textFieldStyle}
          underlineFocusStyle={styles.underlineStyle}
          type='text'
          ref='username'
          id='username'
        />
        <TextField
          floatingLabelText='Enter or create a password'
          style={styles.textFieldStyle}
          underlineFocusStyle={styles.underlineStyle}
          type='password'
          ref='password'
          id='password'
        />
        <RaisedButton
          label='Login'
          primary
          style={styles.loginStyle}
          fullWidth
          onTouchTap={this._handleLogin}
        />
        <RaisedButton
          label='Sign up'
          secondary
          style={styles.signupStyle}
          fullWidth
          onTouchTap={this._handleSignup}
        />
      </Card>
    )
  }
}
