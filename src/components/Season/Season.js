import React from 'react';
import { shape, string } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import EventList from './Events/EventList';
import Leaderboard from './Leaderboard';
import Header from '../Shared/Header';

const Season = ({ season, ...rest }) => (
  <div className="container">
    <Header showPhoto />
    <nav className="subnav">
      <NavLink activeClassName="selected" to={`/${season.name}`} exact>
        Ledartavla
      </NavLink>
      <NavLink activeClassName="selected" to={`/${season.name}/rundor`}>
        Rundor
      </NavLink>
    </nav>
    <Switch>
      <Route
        exact
        path={`/${season.name}`}
        render={() => <Leaderboard {...rest} seasonId={season.id} />}
      />
      <Route
        path={`/${season.name}/rundor`}
        render={() => <EventList {...rest} seasonId={season.id} />}
      />
    </Switch>
  </div>
);

Season.propTypes = {
  userId: string.isRequired,
  season: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
};

export default Season;
