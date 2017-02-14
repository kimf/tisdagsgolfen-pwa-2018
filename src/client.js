import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'

const dataIdFromObject = result => result.id

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

    req.options.headers.authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODYyNDc2NTQsImNsaWVudElkIjoiY2l5cWFoZmI5NHNrMjAxMjA5bWJ4b2FzcSIsInByb2plY3RJZCI6ImNpeXFheDJvMDR0MzcwMTIwOTJudHJkN2UiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNpeXJ0aDl6NjVoZm8wMTMydWVzMXBzcWwifQ.0GnTlwX9vjWx_WCWjGm9bIjck9HwcSGKK2vr74nKnW4`
    next()
  }
}])
/* eslint-enable no-param-reassign */

export default new ApolloClient({ networkInterface, dataIdFromObject })
