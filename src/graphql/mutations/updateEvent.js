import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const setEventAsFinishedMutation = gql`
  mutation updateSeasonLeaderboard(
    $id:ID!
  ) {
    updatedEvent: updateEvent(
      id: $id
      status: "finished"
    ) {
      id
    }
  }
`

const withSetEventAsFinishedMutation = graphql(setEventAsFinishedMutation, {
  props: ({ mutate }) => ({
    setEventAsFinished: id =>
      mutate({
        variables: {
          id
        }
      })
  })
})

export default withSetEventAsFinishedMutation
