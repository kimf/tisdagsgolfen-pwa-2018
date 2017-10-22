import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import apolloClient from './client'
import store from './store'

import App from './App'

import './index.css'


class Root extends Component {
  state = { hasLoaded: false }
  store = store(apolloClient, () => { this.setState({ hasLoaded: true }) })

  render() {
    const { hasLoaded } = this.state

    if (!hasLoaded) {
      return null
    }

    return (
      <ApolloProvider client={apolloClient} store={this.store}>
        <App />
      </ApolloProvider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
