import { injectReducer } from 'store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Chat = require('./containers/Chat').default
      const reducer = require('./modules/Chat').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { name: 'Chat', key: 'chat', reducer })

      /*  Return getComponent   */
      cb(null, Chat)

    /* Webpack named bundle   */
    }, 'chat')
  }
})
