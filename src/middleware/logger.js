import * as loglevel from 'loglevel'

if (!__PROD__) {
  loglevel.setLevel('debug')
} else {
  loglevel.setLevel('error')
}

export default loglevel
