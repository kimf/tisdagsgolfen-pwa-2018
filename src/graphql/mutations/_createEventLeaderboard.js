import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// This should be done when closing an Event, after the scores are saved (or at the same time)
const createEventLeaderboardMutation = gql`
  mutation createEventLeaderboard(
    $eventId:ID!,
    $scoreId:ID!,
    $position:Int!,
    $previousTotalPosition:Int!,
    $totalPosition:Int!,
    $totalEventCount:Int!,
    $totalAveragePoints:Float!,
    $totalEventPoints:Float!
  ) {
    newEventLeaderboard: createEventLeaderboard(
      eventId: $eventId
      scoreId: $scoreId
      position: $position
      previousTotalPosition: $previousTotalPosition
      totalPosition: $totalPosition
      totalEventCount: $totalEventCount
      totalAveragePoints: $totalAveragePoints
      totalEventPoints: $totalEventPoints
    ) {
      id
    }
  }
`

const withCreateEventLeaderboardMutation = graphql(
  createEventLeaderboardMutation,
  {
    props: ({ mutate }) => ({
      createEventLeaderboard: (
        eventId,
        scoreId,
        position,
        previousTotalPosition,
        totalPosition,
        totalEventCount,
        totalAveragePoints,
        totalEventPoints
      ) =>
        mutate({
          variables: {
            eventId,
            scoreId,
            position,
            previousTotalPosition,
            totalPosition,
            totalEventCount,
            totalAveragePoints,
            totalEventPoints
          }
        })
    })
  }
)

export default withCreateEventLeaderboardMutation
