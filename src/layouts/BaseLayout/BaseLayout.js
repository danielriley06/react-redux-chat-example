import React from 'react'
import log from 'middleware/logger'

export const BaseLayout = ({ children }) => {
  log.debug('BaseLayout', children)
  return (<div className='BaseLayout'>{children}</div>)
}

BaseLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default BaseLayout
