import React, { Component } from 'react'
import { arrayOf, bool, string, shape } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import ScoringLeaderboardCard from './ScoringLeaderboardCard'
import ScorecardHeaderRow from './ScorecardHeaderRow'
import Header from '../Shared/Header'
import Tabs from '../Shared/Tabs'
// import Header from 'shared/Header'
// import EventHeader from 'Events/EventHeader'

import { withLiveLeaderboardQuery } from '../../graphql/queries/liveLeaderboardQuery'
import { rankBySorting, massageIntoLeaderboard } from '../../utils'

class ScoringLeaderboard extends Component {
  static propTypes = {
    currentUserId: string.isRequired,
    scoringSessionId: string.isRequired,
    scoringType: string.isRequired,
    teamEvent: bool.isRequired,
    data: shape({
      loading: bool,
      scoringSessions: arrayOf(shape()) // TODO: How do we want the data to look?
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      scoringSessions: []
    }
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.setState({ sorting })
  }

  render() {
    const {
      data,
      currentUserId,
      scoringSessionId,
      scoringType,
      teamEvent
    } = this.props
    const { sorting } = this.state

    let sortedPlayers = []
    if (data.scoringSessions && data.scoringSessions.length > 0) {
      const players = massageIntoLeaderboard(data.scoringSessions, teamEvent)
      sortedPlayers = rankBySorting(players, sorting, teamEvent, scoringType)
    }

    // TODO: Show tabs for teamEvents when you figured out how to solve the beers part
    return (
      <div key="scoringLeaderboard">
        <Header title="Ledartavla" />
        <div className="leaderboard">
          {teamEvent
            ? null
            : <Tabs
              teamEvent={teamEvent}
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
              scoringType={scoringType}
            />
          }

          {sorting === 'totalPoints'
            ? <ScorecardHeaderRow
              scoring={false}
              scoringType={scoringType}
              teamEvent={teamEvent}
            />
            : null
          }

          <ul>
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
          </ul>
        </div>
        <Link to={`/spela/${scoringSessionId}`} className="button">STÄNG</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUserId: state.app.user.id,
  scoringSessionId: state.app.activeScoringSession.id,
  teamEvent: state.app.activeScoringSession.teamEvent,
  scoringType: state.app.activeScoringSession.scoringType
})

export default compose(
  connect(mapStateToProps),
  withLiveLeaderboardQuery
)(ScoringLeaderboard)