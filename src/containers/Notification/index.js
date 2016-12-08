import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import log from 'middleware/logger'
import { actions as Notify } from 'store/notification'
import SingleAlert from './Alert'

import styles from './style.scss'
export class Notification extends React.Component {
  static propTypes = {
    notification: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  _hideAlert = (index) => {
    const { dispatch } = this.context.store
    dispatch(Notify.hide(index))
    setTimeout(() => {
      dispatch(Notify.clear(index))
    }, 500)
  }

  render () {
    const { notification } = this.props
    const _notifications = notification.map((item, index) => {
      return (<SingleAlert hideAlert={this._hideAlert} index={index} alert={item} key={index} />)
    })

    const _emit = () => {
      const { dispatch } = this.context.store
      dispatch(Notify.emit({
        msg: '1234',
        type: 'info',
        visible: true,
        dismissable: true,
        title: 'test title 2'
      }))
    }

    return (<div className='Notification'>
      <div className='Notifications'>
        {_notifications}
      </div>
      <button onClick={_emit}>Emit Alert</button>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
})
export default connect(mapStateToProps)(Notification)
