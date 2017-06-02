import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createScoreMutation = gql`
  mutation createScore(
    $eventId:ID!,
    $userId:ID!,
    $value:Int!,
    $eventPoints:Int!,
    $kr:Int!,
    $beers:Int!,
  )
  {
    score: createScore(
      eventId: $eventId
      userId: $userId
      value: $value
      eventPoints: $eventPoints
      kr: $kr
      beers: $beers
    ) {
      id
      value
      eventPoints
      kr
      beers
      user {
        id
      }
    }
  }
`

const withCreateScoreMutation = graphql(createScoreMutation, {
  props: ({ mutate }) => ({
    createScore: (eventId, userId, value, eventPoints, kr, beers) =>
      mutate({
        variables: {
          eventId,
          userId,
          value,
          eventPoints,
          kr,
          beers
        }
      })
  })
})

export default withCreateScoreMutation
