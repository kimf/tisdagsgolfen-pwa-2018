import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery($eventId: ID!) {
    scoringSessions: allScoringSessions(
      filter: {
        event: { id: $eventId }
      }
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

const withLiveLeaderboardQuery = graphql(liveLeaderboardQuery, {
  options: ({ event }) => ({
    variables: { eventId: event.id }
  }),
  name: 'scoringSessions'
})

export default withLiveLeaderboardQuery
