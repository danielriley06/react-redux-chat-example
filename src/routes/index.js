import AppRoute from './App'
import AuthRoute from './Auth'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'


export const createRoutes = (store) => {
  return {
    path        : '/',
    component   : CoreLayout,
    indexRoute  : AuthRoute,
    childRoutes  : [
      {
        childRoutes: [
          AppRoute(store)
        ]
      }
    ]
  }
}


//export const createRoutes = (store) => ({
//  path        : '/',
//  component   : CoreLayout,
//  indexRoute  : Home,
//  childRoutes : [
//    CounterRoute(store)
//  ]
//})

export default createRoutes
