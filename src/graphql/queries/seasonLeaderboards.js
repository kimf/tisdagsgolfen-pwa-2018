import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
/* eslint-disable no-console */

const seasonLeaderboardsQuery = gql`
query seasonLeaderboards($seasonId: ID!) {
  seasonLeaderboards: allSeasonLeaderboards(
    filter:{
      season: { id: $seasonId }
    }
  ) {
    id
    position
    previousPosition
    eventCount
    top5Points
    totalPoints
    averagePoints
    totalKr
    totalBeers
    user {
      id
    }
  }
}`

const withSeasonLeaderboardsQuery = graphql(seasonLeaderboardsQuery, {
  options: ({ seasonId }) => ({
    variables: { seasonId }
  }),
  name: 'seasonLeaderboards'
})

export default withSeasonLeaderboardsQuery
