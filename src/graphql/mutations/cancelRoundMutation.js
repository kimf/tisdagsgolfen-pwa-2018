import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// const liveScoreStrings = liveScoreIds => liveScoreIds.map(lsId =>
//   `liveScore_${lsId}: deleteLiveScore(id: ${lsId})`
// ).join()

// const scoringPlayerStrings = scoringPlayerIds => scoringPlayerIds.map(spId =>
//   `scoringPlayer_${spId}: deleteScoringPlayer(id: ${spId})`
// ).join()

// const scoringTeamStrings = scoringTeamIds => scoringTeamIds.map(stId =>
//   `scoringTeam_${stId}: deleteScoringTeam(id: ${stId})`
// ).join()


const cancelRoundMutation = gql`
  mutation cancelRoundMutation(
    $scoringSessionId: ID!
  ) {
    deleteScoringSession(id: $scoringSessionId) {
      id
    }
  }
`

export default cancelRoundMutation

export const withCancelRoundMutation = graphql(cancelRoundMutation, {
  props: ({ mutate }) => ({
    cancelRound: scoringSessionId => mutate({
      variables: { scoringSessionId }
    })
  })
})
