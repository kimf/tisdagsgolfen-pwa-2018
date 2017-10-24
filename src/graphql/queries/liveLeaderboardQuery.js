import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery {
    scoringSessions: allScoringSessions(
      filter: { status_in: "live" }
    ) {
      scoringPlayers {
        id
        extraStrokes
        liveScores {
          id
          beers
          points
          putts
          strokes
          hole {
            id
            par
          }
        }
        user {
          id
          firstName
          lastName
          photo
        }
      }
      scoringTeams {
        id
        extraStrokes
        liveScores {
          id
          beers
          points
          putts
          strokes
          hole {
            id
            par
          }
        }
        users {
          id
          firstName
          lastName
          photo
        }
      }
    }
  }
`

export default liveLeaderboardQuery

export const withLiveLeaderboardQuery = graphql(liveLeaderboardQuery, {
  options: () => ({
    fetchPolicy: 'network-only',
    pollInterval: 30000
  })
})
