import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LeaderboardCard from './LeaderboardCard'
import Tabs from '../Tabs'
import EmptyState from '../../Shared/EmptyState'
import Loading from '../../Shared/Loading'

import { ranked } from '../../../utils'

const leaderboardTabs = [
  { value: '/', icon: '🤷', title: 'Poäng' },
  { value: '/beers', icon: '🍻', title: 'Öl' },
  { value: '/kr', icon: '💸', title: 'Skuld' }
]


class Leaderboard extends Component {
  state = { sorting: 'totalPoints' }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seasonName !== this.props.seasonName) {
      if (this.listView) {
        this.listView.scrollTo({ x: 0, y: 0, animated: true })
      }
      this.setState({ sorting: 'totalPoints' })
    }
  }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  render() {
    const { data, seasonName, userId } = this.props
    const { sorting } = this.state

    if (data.loading) {
      return <Loading text="Laddar ledartavla..." />
    }

    const emptyLeaderboard = data.items.filter(sl => sl.eventCount !== 0).length === 0
    if (emptyLeaderboard) {
      return <EmptyState text="Inga rundor spelade ännu" />
    }


    const showLeaderboardTabs = parseInt(seasonName, 10) > 2015

    let sortedLeaderboard
    if (sorting === 'beers') {
      sortedLeaderboard = data.items.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedLeaderboard = ranked(sortedLeaderboard, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      sortedLeaderboard = data.items.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedLeaderboard = ranked(sortedLeaderboard, 'krPos', 'totalKr')
    } else {
      sortedLeaderboard = data.items.slice().sort((a, b) => a.position - b.position)
    }

    return (
      <div className="container">
        { showLeaderboardTabs
          ?
            <Tabs
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
              tabs={leaderboardTabs}
              seasonName={seasonName}
            />
          : null
        }
        <ul ref={(ref) => { this.listView = ref }}>
          {sortedLeaderboard.map(rowData =>
            <LeaderboardCard key={`l_${seasonName}_${sorting}_${rowData.id}`} currentUserId={userId} data={rowData} sorting={sorting} />
          )}
        </ul>
      </div>
    )
  }
}

const { arrayOf, bool, shape, string } = React.PropTypes

Leaderboard.propTypes = {
  data: shape({
    loading: bool,
    items: arrayOf(shape())
  }),
  seasonName: string.isRequired,
  userId: string.isRequired
}

Leaderboard.defaultProps = {
  data: {
    loading: true,
    items: []
  }
}

const leaderboardQuery = gql`
  query($seasonId: ID!) {
    items: allSeasonLeaderboards (
      orderBy: position_DESC,
      filter: { season: { id: $seasonId } }
    ) {
      id
      averagePoints
      position
      previousPosition
      totalPoints
      totalBeers
      totalKr
      top5Points
      eventCount
      user {
        id
        firstName
        lastName
      }
    }
  }
`

const LeaderboardWithData = graphql(leaderboardQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})(Leaderboard)

LeaderboardWithData.propTypes = {
  seasonId: string.isRequired
}

export default LeaderboardWithData
