import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import uuid from 'node-uuid'

export default class MessageComposer extends Component {

  static propTypes = {
    activeConversation: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: '',
      typing: false
    };
  }
  handleSubmit(event) {
    const { user, socket, activeConversation} = this.props
    const text = event.target.value.trim()
    if (event.which === 13) {
      event.preventDefault()
      var newMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: this.props.activeConversation,
        text: text,
        user: user,
        time: moment.utc().format('lll')
      };
      socket.emit('new message', newMessage)
      socket.emit('stop typing', { user: user.username, channel: activeConversation })
      this.props.onSave(newMessage)
      this.setState({ text: '', typing: false })
    }
  }
  handleChange(event) {
    const { socket, user, activeConversation } = this.props
    this.setState({ text: event.target.value })
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing', { user: user.username, channel: activeConversation })
      this.setState({ typing: true})
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing', { user: user.username, channel: activeConversation })
      this.setState({ typing: false})
    }
  }
  render() {
    return (
      <div style={{
        zIndex: '52',
        left: '21.1rem',
        right: '1rem',
        width: '100%',
        flexShrink: '0',
        order: '2',
        marginTop: '0.5em'
      }}>
        <TextField
          style={{
            height: '100%',
            fontSize: '2em',
            marginBottom: '1em'
          }}
          fullWidth={true}
          type="textarea"
          name="message"
          ref="messageComposer"
          autoFocus="true"
          hintText="Type here to chat!"
          value={this.state.text}
          onChange={::this.handleChange}
          onKeyDown={::this.handleSubmit}
        />
      </div>
    )
  }
}
