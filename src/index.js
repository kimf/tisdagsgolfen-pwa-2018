import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css';
import { ApolloProvider } from 'react-apollo'
import client from './client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
