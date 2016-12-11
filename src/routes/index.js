import AppRoute from './App'
import AuthRoute from './Auth'
import HomeRoute from './Home'

import BaseLayout from 'layouts/BaseLayout/BaseLayout'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AuthLayout from 'layouts/AuthLayout/AuthLayout'

import { Authenticated } from 'containers/Authenticated'
import { transitionTo } from 'containers/transitionTo'

export const createRoutes = (store) => {
  return {
    path        : '/',
    component   : transitionTo(BaseLayout),
    indexRoute  : HomeRoute,
    childRoutes  : [
      {
        childRoutes: [
          AuthRoute(store)
        ]
      },
      {
        childRoutes: [
          AppRoute(store)
        ]
      }
    ]
  }
}

export default createRoutes
