import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import './index.css';

import apolloClient from './client';
import configureStore from './store';

const { store, persistor } = configureStore();

const Root = () => (
  <PersistGate persistor={persistor}>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </PersistGate>
);

ReactDOM.render(<Root />, document.getElementById('root'));
