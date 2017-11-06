import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';

import Loading from '../Shared/Loading';
import EmptyState from '../Shared/EmptyState';
import withSeasonLeaderboardQuery from '../../graphql/queries/seasonLeaderboardQuery';
import UpOrDown from '../Shared/UpOrDown';

const Leaderboard = ({ seasonLeaderboard, seasonId }) => {
  if (seasonLeaderboard.loading) {
    return <Loading text="Laddar ledartavla..." />;
  }

  if (seasonLeaderboard.seasonLeaderboard.length === 0) {
    return <EmptyState text="Inget att visa här :(" />;
  }

  return (
    <table key={`leaderboard_${seasonId}`} cellSpacing="0" cellPadding="0">
      <thead>
        <tr>
          <th>Pos</th>
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
          .sort((a, b) => a.position - b.position)
          .map(user => (
            <tr key={`season_${seasonId}_${user.id}`}>
              <td>
                <strong>{user.position}</strong>
                <UpOrDown prev={user.prevPosition} current={user.position} />
              </td>
              <td>{user.name}</td>
              <td>{user.beers}</td>
              <td>{user.eventCount}</td>
              <td>{user.average}</td>
              <td>
                <strong>{user.totalPoints} p</strong>
              </td>
              <td>
                <small>{user.topPoints.join(', ')}</small>
              </td>
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
  seasonId: string.isRequired,
};

export default withSeasonLeaderboardQuery(Leaderboard);
