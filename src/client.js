import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { getCache } from './utils'

const dataIdFromObject = result => result.id

const wsClient = new SubscriptionClient('ws://subscriptions.graph.cool/ciyqax2o04t37012092ntrd7e', {
  reconnect: true,
  connectionParams: {
      // Pass any arguments you want for initialization
  }
})

const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e',
  batchInterval: 10,
  queryDeduplication: true
})

/* eslint-disable no-param-reassign */
networkInterface.use([{
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
}])
/* eslint-enable no-param-reassign */

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export default new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject
})
