import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { getCache } from './utils'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:60000/simple/v1/cj94a1ew6002l0198pmwbruv5',
  batchInterval: 10,
  queryDeduplication: true
})

/* eslint-disable no-param-reassign */
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      getCache('currentUser').then((currentUser) => {
        if (currentUser === null) {
          next()
        } else {
          req.options.headers.authorization = `Bearer ${currentUser.token}`
          next()
        }
      })
    }
  }
])
/* eslint-enable no-param-reassign */

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})
