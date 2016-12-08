import React, { PropTypes } from 'react'
import log from 'middleware/logger'

import { Alert } from 'react-bootstrap'

export default class SingleAlert extends React.Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    hideAlert: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.state = {
      isHovering: false,
      timeout: null
    }
  }

  componentDidMount () {
    this.setState({ timeout: this._timeout() })
  }

  _hideAlert = () => {
    const { index, hideAlert } = this.props
    this._clearTimeout()
    hideAlert(index)
  }

  _timeout = () => {
    setTimeout(() => {
      if (!this.state.isDismissed) {
        this.props.hideAlert(this.props.index)
      }
    }, (__DEBUG__) ? 20000 : 5000)
  }

  _clearTimeout = () => {
    this.setState({
      isHovering: true
    })
    clearTimeout(this.state.timeout)
    this.setState({ timeout: null })
  }

  _setTimeout = () => {
    this.setState({
      isHovering: false
    })
    this.setState({ timeout: this._timeout() })
  }

  render () {
    const { alert } = this.props
    const classnames = [
      'fade',
      (!alert.get('visible')) && 'fade--hidden'
    ].filter(Boolean)

    return (
      <Alert
        bsStyle={alert.get('type')}
        className={classnames.join(' ')}
        onMouseEnter={this._clearTimeout}
        onMouseLeave={this._setTimeout}
        onDismiss={(alert.get('dismissable')) ? this._hideAlert : null}
      >
        <p>
          {alert.get('title') &&
            <span className='AlertTitle'>
              <strong>{alert.get('title')}</strong>
              <br />
            </span>
          }
          <span className='AlertMsg'>
            {alert.get('msg')}
          </span>
        </p>
      </Alert>
    )
  }
}
