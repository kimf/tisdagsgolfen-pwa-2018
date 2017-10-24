import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const updateLiveScoreMutation = gql`
  mutation updateLiveScore(
    $id: ID!,
    $extraStrokes: Int!,
    $strokes:Int!,
    $putts:Int!,
    $points:Int!,
    $beers:Int!
  ) {
    updateLiveScore(
      id:$id,
      extraStrokes:$extraStrokes,
      strokes:$strokes,
      putts:$putts,
      points:$points,
      beers:$beers
    ) {
      id
      extraStrokes
      strokes
      putts
      points
      beers
    }
  }
`

export default updateLiveScoreMutation

export const withUpdateLiveScoreMutation = graphql(updateLiveScoreMutation, {
  props: ({ mutate }) => ({
    updateLiveScore: scoreItem => mutate({ variables: { ...scoreItem } })
  })
})
