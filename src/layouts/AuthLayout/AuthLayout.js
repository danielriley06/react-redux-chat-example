import React from 'react'
import log from 'middleware/logger'
import './AuthLayout.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const AuthLayout = ({ children }) => {
  return (
    <div>
      <MuiThemeProvider>
        <div className='containerFluid text-center'>
          <div className='core-layout__viewport'>
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  )
}

AuthLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default AuthLayout
