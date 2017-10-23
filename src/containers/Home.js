import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import { shape, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'

import Profile from '../components/Profile'
import Season from '../components/Season/Season'
import NewSeason from '../components/Season/NewSeason'
import EmptyState from '../components/Shared/EmptyState'
import NewRound from '../components/Play/NewRound'
import ScoringWrapper from '../components/Play/ScoringWrapper'

const Home = ({ user, seasons, activeScoringSession }) => (
  <Router>
    <div className="app">
      <div className="wrapper">
        <Switch>
          <Route exact path="/profil" render={() => <Profile user={user} />} />
          <Route exact path="/seasons/new" component={NewSeason} />
          <Route exact path="/spela" component={NewRound} />
          <Route exact path="/spela/:scoringSessionId" component={ScoringWrapper} />

          <Route
            path="/:seasonId"
            render={({ match }) => {
              const season = seasons.find(s => s.name === match.params.seasonId)
              return season
                ? <Season key={season.id} season={season} userId={user.id} />
                : <EmptyState text="Oops, denna säsong finns inte, välj en annan" />
            }}
          />

          <Route
            path="/"
            render={() => seasons.length === 0
              ? <Redirect to="/seasons/new" />
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
  activeScoringSession: shape({
    course: shape({
      id: string.isRequired,
      name: string.isRequired,
      club: string.isRequired
    }).isRequired,
    id: string.isRequired,
    status: string.isRequired,
    scorer: shape({
      id: string.isRequired
    }).isRequired
  }),
}

const mapStateToProps = state => ({ ...state.app })

export default connect(mapStateToProps)(Home)
