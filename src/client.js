import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getCache } from './utils';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/api/graphql',
  batchInterval: 10,
  queryDeduplication: true,
});

/* eslint-disable no-param-reassign */
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      getCache('currentUser').then(currentUser => {
        if (currentUser === null) {
          next();
        } else {
          req.options.headers.authorization = `Token token=${currentUser.token}`;
          next();
        }
      });
    },
  },
]);
/* eslint-enable no-param-reassign */

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});
