import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const scoringSessionMutation = gql`
  mutation createScoringSession(
    $courseId:ID!,
    $scorerId:ID!,
    $teamEvent:Boolean!,
    $scoringType:String!,
    $scoringPlayers: [ScoringSessionscoringPlayersScoringPlayer!],
    $scoringTeams: [ScoringSessionscoringTeamsScoringTeam!]
    $startsAt: DateTime!
  )
  {
    createScoringSession(
      courseId: $courseId
      scorerId:$scorerId,
      teamEvent: $teamEvent,
      scoringType: $scoringType,
      scoringPlayers: $scoringPlayers
      scoringTeams: $scoringTeams
      startsAt: $startsAt
      currentHole: 1
    ) {
      id
      course {
        id
        club
        name
      }
      scoringType
      teamEvent

    }
  }
`

export default scoringSessionMutation

export const withCreateScoringSessionMutation = graphql(scoringSessionMutation, {
  props: ({ mutate }) => ({
    createScoringSession: (courseId, scorerId, teamEvent, scoringType, scoringPlayers, scoringTeams = null) => (
      mutate({
        variables: { courseId, scorerId, teamEvent, scoringType, scoringPlayers, scoringTeams, startsAt: new Date() }
      })
    )
  })
})
