import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import { shape, arrayOf, func } from 'prop-types'
import { connect } from 'react-redux'

import Season from '../components/Season/Season'
import NewSeason from '../components/Season/NewSeason'
import Header from '../components/Shared/Header'
import EmptyState from '../components/Shared/EmptyState'
import NewRound from '../components/Play/NewRound'

import { logout } from '../actions/app'

const Home = ({ user, seasons, onLogout }) => (
  <Router>
    <div className="app">
      <Header user={user} seasons={seasons} onLogout={onLogout} />

      <div className="wrapper">
        <Switch>
          <Route exact path="/seasons/new" component={NewSeason} />
          <Route exact path="/spela" component={NewRound} />

          <Route
            path="/:seasonId"
            render={({ match }) => {
              const season = seasons.find(s => s.name === match.params.seasonId)
              return season ? <Season key={season.id} season={season} userId={user.id} /> : <EmptyState text="Oops, denna säsong finns inte, välj en annan" />
            }}
          />

          <Route
            path="/"
            render={() => seasons.length === 0
              ? <EmptyState text="Inga säsonger ännu!" />
              : <Redirect to={`/${seasons[0].name}`} />}
          />
        </Switch>
      </div>
    </div>
  </Router>
)

Home.propTypes = {
  user: shape().isRequired,
  seasons: arrayOf(shape()).isRequired,
  onLogout: func.isRequired
}

const mapStateToProps = state => ({ ...state.app })

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
