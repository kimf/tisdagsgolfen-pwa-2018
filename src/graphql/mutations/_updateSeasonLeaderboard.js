import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const updateSeasonLeaderboardMutation = gql`
  mutation updateSeasonLeaderboard(
    $id:ID!,
    $position:Int!,
    $previousPosition:Int!,
    $eventCount:Int!,
    $top5Points:[Float!]!,
    $totalPoints:Float!,
    $averagePoints:Float!,
    $totalKr:Int!,
    $totalBeers:Int!
  ) {
    updatedSeasonLeaderboard: updateSeasonLeaderboard(
      id: $id
      position: $position
      previousPosition: $previousPosition
      eventCount: $eventCount
      top5Points: $top5Points
      totalPoints: $totalPoints
      averagePoints: $averagePoints
      totalKr: $totalKr
      totalBeers: $totalBeers
    ) {
      id
    }
  }
`

const withUpdateSeasonLeaderboardMutation = graphql(
  updateSeasonLeaderboardMutation,
  {
    props: ({ mutate }) => ({
      updateSeasonLeaderboard: (
        id,
        position,
        previousPosition,
        eventCount,
        top5Points,
        totalPoints,
        averagePoints,
        totalKr,
        totalBeers
      ) =>
        mutate({
          variables: {
            id,
            position,
            previousPosition,
            eventCount,
            top5Points,
            totalPoints,
            averagePoints,
            totalKr,
            totalBeers
          }
        })
    })
  }
)

export default withUpdateSeasonLeaderboardMutation
