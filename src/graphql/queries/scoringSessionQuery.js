import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const scoringSessionQuery = gql`
  query scoringSession ($scoringSessionId: ID!) {
    scoringSession: ScoringSession(id: $scoringSessionId) {
      id
      currentHole
      scoringType
      teamEvent
      course {
        id
        club
        name
        par
        holes (orderBy: number_ASC) {
          id
          number
          par
          index
          liveScores (
            filter: { scoringSession: { id: $scoringSessionId } }
          ) {
            id
            beers
            extraStrokes
            points
            putts
            strokes
            hole {
              id
            }
            scoringPlayer {
              id
            }
            scoringTeam {
              id
            }
          }
        }
      }
      scoringPlayers {
        id
        extraStrokes
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
export default scoringSessionQuery

export const withScoringSessionQuery = graphql(scoringSessionQuery, {
  options: ({ scoringSessionId }) => ({
    variables: { scoringSessionId }
  })
})
