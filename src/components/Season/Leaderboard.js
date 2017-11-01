import React from 'react';
import { arrayOf, bool, shape } from 'prop-types';

import Loading from '../Shared/Loading';
import EmptyState from '../Shared/EmptyState';
import withSeasonLeaderboardQuery from '../../graphql/queries/seasonLeaderboardQuery';

const Leaderboard = ({ seasonLeaderboard }) => {
  if (seasonLeaderboard.loading) {
    return <Loading text="Laddar ledartavla..." />;
  }

  if (seasonLeaderboard.seasonLeaderboard.length === 0) {
    return <EmptyState text="Inget att visa här :(" />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>↑↓</th>
          <th>Spelare</th>
          <th>
            <span role="img" aria-label="Öl">
              🍺
            </span>
          </th>
          <th>Rundor</th>
          <th>Snitt</th>
          <th>Poäng</th>
          <th>Top 5</th>
          <th>
            <span role="img" aria-label="Skuld">
              🏦
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {seasonLeaderboard.seasonLeaderboard
          .filter(u => u.eventCount > 0)
          .map(user => (
            <tr key={user.id}>
              <td>{user.position}</td>
              <td>{user.prevPosition - user.position}</td>
              <td>{user.name}</td>
              <td>{user.beers}</td>
              <td>{user.eventCount}</td>
              <td>{user.average}</td>
              <td>{user.totalPoints}</td>
              <td>{user.topPoints.join(', ')}</td>
              <td>{user.totalKr} kr</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

Leaderboard.propTypes = {
  seasonLeaderboard: shape({
    loading: bool.isRequired,
    seasonLeaderboard: arrayOf(shape()),
  }).isRequired,
};

export default withSeasonLeaderboardQuery(Leaderboard);
