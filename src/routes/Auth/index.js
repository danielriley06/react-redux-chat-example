import { injectReducer } from 'store/reducers'

import AuthLayout from 'layouts/AuthLayout/AuthLayout'
import LoginRoute from './routes/Login'

export default (store) => ({
  path: '/auth',
  /*  Async getComponent is only invoked when route matches   */
  component: AuthLayout,
  getIndexRoute (location, next) {
    require.ensure([
      './routes/Login'
    ], (require) => {
      const LoginRoute = require('./routes/Login').default(store)
      next(null, LoginRoute)
    })
  },
  getChildRoutes (location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Login').default(store)
      ])
    })
  }
})
