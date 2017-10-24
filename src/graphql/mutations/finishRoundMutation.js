import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const finishRoundMutation = gql`
  mutation finishRoundMutation(
    $scoringSessionId: ID!
  ) {
    updateScoringSession(
      id: $scoringSessionId
        status: "finished"
    ) {
      id
      status
    }
  }
`

export default finishRoundMutation

export const withFinishRoundMutation = graphql(finishRoundMutation, {
  props: ({ mutate }) => ({
    finishRound: scoringSessionId => mutate({
      variables: { scoringSessionId },
      refetchQueries: [
        'seasonEventsQuery'
      ]
    })
  })
})
