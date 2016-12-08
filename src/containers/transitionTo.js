import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Router } from 'react-router'

import log from 'middleware/logger'

export function transitionTo (Component) {
  class transitionToComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object.isRequired
    }

    static contextTypes = {
      store: React.PropTypes.any,
      router: React.PropTypes.any
    }

    componentWillMount () {
      const { store: { dispatch }, router } = this.context
      router.replace({
        pathname: '/app'
      })
    }
    render () {
      return (<Component {...this.props} />)
    }
  }
  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(transitionToComponent)
}
