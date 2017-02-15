import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './containers/Home'
import Profile from './containers/Profile'
import Login from './containers/Login'

import { getCache, setCache } from './utils'

class App extends Component {
  state = { checkingLoggin: true, loggedOut: true, email: '' }

  componentDidMount() {
    getCache('currentUser').then((value) => {
      if (value && value.token) {
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
      } else {
        const email = value ? value.email : ''
        this.setState({ checkingLoggin: false, loggedOut: true, email })
      }
    })
  }

  logout = (email, callback) => {
    setCache('currentUser', { email }).then(() => {
      this.setState({ loggedOut: true })
      callback()
    })
  }

  login = (email, token) => {
    setCache('currentUser', { email, token }).then(() => {
      this.setState({ loggedOut: false })
    })
  }

  render() {
    if (this.state.checkingLoggin) { return null }
    if (this.state.loggedOut) { return <Login email={this.state.email} onLogin={this.login} /> }

    return (
      <div className="container">
        <h2>Test PWA App</h2>
        <Switch>
          <Route exact path="/profile" render={() => <Profile onLogout={this.logout} />} />
          <Route path="/:seasonName?" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
