import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getCache } from './utils';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/api/graphql',
});

const dataIdFromObject = result => {
  // eslint-disable-next-line no-underscore-dangle
  if (result.id && result.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return result.__typename + result.id;
  }
  // Make sure to return null if this object doesn't have an ID
  return null;
};

const cache = new InMemoryCache({
  dataIdFromObject,
  addTypename: true,
});

const authLink = setContext((_, { headers }) => {
  getCache('currentUser').then(currentUser => ({
    ...headers,
    authorization:
      currentUser && currentUser.token
        ? `Token token=${currentUser.token}`
        : null,
  }));
});

const link = authLink.concat(httpLink);

export default new ApolloClient({
  link,
  cache,
});
