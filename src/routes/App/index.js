import { injectReducer } from 'store/reducers'
import { Authenticated } from 'containers/Authenticated'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

export default (store) => ({
  path: '/app',
  component: Authenticated(CoreLayout),
  /*  Async getComponent is only invoked when route matches   */
  getIndexRoute (location, next) {
    require.ensure([
      './Chat'
    ], (require) => {
      const Chat = require('./Chat').default(store)
      next(null, Chat)
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './Chat',
      './Chat/modules/Chat'
    ], (require) => {
      const Chat = require('./Chat/containers/Chat').default
      const reducer = require('./Chat/modules/Chat').default
      injectReducer(store, { key: 'chat', reducer })
      next(null, Chat)
    })
  }
})
