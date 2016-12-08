import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import lodash from 'lodash'

import log from 'middleware/logger'
import { actions as Auth } from 'store/auth'

export function Authenticated (Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object.isRequired
    }

    static contextTypes = {
      store: React.PropTypes.any,
      router: React.PropTypes.any
    }

    componentWillMount () {
      const { auth } = this.props
      this.checkAuth(auth.isAuthenticated)
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth (isAuthenticated) {
      const { store: { dispatch }, router } = this.context
      const { auth } = this.props
      const isLoggedIn = Auth.isAuthenticated()
      const userExists = !lodash.isEmpty(auth.get('username'))

      if (!userExists) {
        dispatch(Auth.setup())
      }

      if (!isLoggedIn) {
        router.replace('/auth/login')
      }
    }

    render () {
      const { auth } = this.props
      log.debug(this)

      return (<div>
        {(auth.get('isAuthenticated') === true)
          ? <Component {...this.props} />
          : null
        }
      </div>)
    }
  }
  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
