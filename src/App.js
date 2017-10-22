import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { bool } from 'prop-types'

import Home from './containers/Home'
import Login from './containers/Login'
import Loading from './components/Shared/Loading'

import { withMainQuery, mainQueryProps } from './graphql/queries/mainQuery'


const App = ({ data, loggedIn }) => {
  if (!loggedIn) {
    return (
      <div className="centerwrapper">
        <Login />
      </div>
    )
  }

  if (data.loading) {
    return (
      <div className="container">
        <Loading text="Startar golfbilarna..." />
      </div>
    )
  }

  return <Home />
}

App.propTypes = {
  data: mainQueryProps,
  loggedIn: bool.isRequired
}

App.defaultProps = {
  data: {
    loading: true,
    user: null,
    seasons: null
  }
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn
})


export default compose(
  connect(mapStateToProps),
  withMainQuery
)(App)

