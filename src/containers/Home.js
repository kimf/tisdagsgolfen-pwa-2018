import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

import Profile from '../components/Profile';
import Season from '../components/Season/Season';
import EmptyState from '../components/Shared/EmptyState';
import NewRound from '../components/ScoringSetup/NewRound';
import Scoring from '../components/Scoring/Scoring';
import ScoringLeaderboard from '../components/Scoring/ScoringLeaderboard';

const fourOfourUrl = seasons =>
  seasons.length === 0 ? '/seasons/new' : `/${seasons[0].name}`;

const Home = ({ user, seasons }) => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/profil" render={() => <Profile user={user} />} />
        <Route exact path="/spela" component={NewRound} />
        <Route exact path="/spela/:scoringSessionId" component={Scoring} />
        <Route
          exact
          path="/spela/:scoringSessionId/ledartavla"
          component={ScoringLeaderboard}
        />

        <Route
          path="/:seasonId"
          render={({ match }) => {
            const season = seasons.find(s => s.name === match.params.seasonId);
            if (season) {
              return (
                <Season key={season.id} season={season} userId={user.id} />
              );
            }
            return (
              <EmptyState text="Oops, denna säsong finns inte, välj en annan" />
            );
          }}
        />

        <Route
          path="/"
          render={() => <Redirect to={fourOfourUrl(seasons)} />}
        />
      </Switch>
    </div>
  </Router>
);

Home.propTypes = {
  user: shape().isRequired,
  seasons: arrayOf(shape()).isRequired,
};

const mapStateToProps = state => ({ ...state.app });

export default connect(mapStateToProps)(Home);
