import React from 'react'
import log from 'middleware/logger'
import './AuthLayout.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const AuthLayout = ({ children }) => {
  return (<div className='container text-center core-layout__viewport'>
    {children}
  </div>)
}

AuthLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default AuthLayout
