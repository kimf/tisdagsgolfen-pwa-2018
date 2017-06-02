/* eslint-disable no-console */

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const eventLeaderboardsQuery = gql`
  query eventLeaderboards($seasonId: ID!) {
    eventLeaderboards: allEventLeaderboards(
      filter: {
        event: { season: { id: $seasonId } }
      }
    ) {
      id
      position
      previousTotalPosition
      totalAveragePoints
      totalEventCount
      totalEventPoints
      totalPosition
      score {
        id
        eventPoints
        user {
          id
        }
      }
    }
  }
`

const withEventLeaderboardsQuery = graphql(eventLeaderboardsQuery, {
  options: ({ seasonId }) => ({
    variables: { seasonId }
  }),
  name: 'eventLeaderboards'
})

export default withEventLeaderboardsQuery
