import React, { Component } from 'react';
import { arrayOf, bool, string, shape } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import ScoringLeaderboardCard from './ScoringLeaderboardCard';
import ScorecardHeaderRow from './ScorecardHeaderRow';
import Header from '../Shared/Header';
import Tabs from '../Shared/Tabs';
// import Header from 'shared/Header'
// import EventHeader from 'Events/EventHeader'

import { withLiveLeaderboardQuery } from '../../graphql/queries/liveLeaderboardQuery';

class ScoringLeaderboard extends Component {
  static propTypes = {
    currentUserId: string.isRequired,
    scoringType: string.isRequired,
    teamEvent: bool.isRequired,
    data: shape({
      loading: bool,
      liveLeaderboard: arrayOf(shape()), // TODO: How do we want the data to look?
    }),
  };

  static defaultProps = {
    data: {
      loading: true,
      scoringSessions: [],
    },
  };

  state = { sorting: 'totalPoints' };

  changeSort = sorting => {
    this.setState({ sorting });
  };

  render() {
    const { data, currentUserId, scoringType, teamEvent } = this.props;
    const { sorting } = this.state;

    let sortedPlayers = [];
    if (data.liveLeaderboard && data.liveLeaderboard.length > 0) {
      sortedPlayers = data.liveLeaderboard;
    }

    // TODO: Show tabs for teamEvents when you figured out how to solve the beers part
    return [
      <Header key="ScoringLeaderboardHeader" title="Ledartavla" goBack />,
      <div key="ScoringLeaderboardContainer" className="container">
        {!teamEvent && (
          <Tabs
            teamEvent={teamEvent}
            currentRoute={sorting}
            onChange={sort => this.changeSort(sort)}
            scoringType={scoringType}
          />
        )}
        <table>
          <ScorecardHeaderRow
            leaderboard
            scoring={false}
            scoringType={scoringType}
            teamEvent={teamEvent}
          />
          <tbody>
            {sortedPlayers.map(item => (
              <ScoringLeaderboardCard
                key={`l_${item.id}`}
                scoringType={scoringType}
                currentUserId={currentUserId}
                player={item}
                sorting={sorting}
                teamEvent={teamEvent}
              />
            ))}
          </tbody>
        </table>
      </div>,
    ];
  }
}

const mapStateToProps = state => ({
  currentUserId: state.app.user.id,
  scoringSessionId: state.app.activeScoringSession.id,
  teamEvent: state.app.activeScoringSession.teamEvent,
  scoringType: state.app.activeScoringSession.scoringType,
});

export default compose(connect(mapStateToProps), withLiveLeaderboardQuery)(
  ScoringLeaderboard,
);
