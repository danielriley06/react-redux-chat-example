import { injectReducer } from 'store/reducers'

import LoginRoute from './containers/Login'

export default (store) => ({
  path: '/auth/login',
  /*  Async getComponent is only invoked when route matches   */
  component: LoginRoute
})
