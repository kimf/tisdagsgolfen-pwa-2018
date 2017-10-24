import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

const createLiveScoreMutation = gql`
  mutation createLiveScore(
    $holeId: ID!,
    $scoringSessionId: ID!,
    $scoringPlayerId: ID,
    $scoringTeamId: ID,
    $extraStrokes: Int!,
    $strokes:Int!,
    $putts:Int!,
    $points:Int!,
    $beers:Int!
  ) {
    createLiveScore(
      holeId:$holeId,
      scoringSessionId:$scoringSessionId,
      scoringPlayerId:$scoringPlayerId,
      scoringTeamId:$scoringTeamId,
      extraStrokes:$extraStrokes,
      strokes:$strokes,
      putts:$putts,
      points:$points,
      beers:$beers
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
`

export default createLiveScoreMutation

/*
client.mutate({
  mutation: TodoCreateMutation,
  variables: {
    text,
  },
  update: (proxy, { data: { createTodo } }) => {
    // Read the data from our cache for this query.
    const data = proxy.readQuery({ query: TodoAppQuery });
    // Add our todo from the mutation to the end.
    data.todos.push(createTodo);
    // Write our data back to the cache.
    proxy.writeQuery({ query: TodoAppQuery, data });
  },
});
*/

// ids = { eventId, holeId, scoringSessionId, (scoringPlayerId | scoringTeamId) }
// scoreItem = { extraStrokes, strokes, putts, points, beers}
export const withCreateLiveScoreMutation = graphql(createLiveScoreMutation, {
  props: ({ mutate }) => ({
    createLiveScore: (ids, scoreItem) => mutate({
      variables: { ...ids, ...scoreItem },
      updateQueries: {
        scoringSession: (prev, { mutationResult }) => {
          // eslint-disable-next-line no-console
          const holeIndex = prev.scoringSession.course.holes.findIndex(h => h.id === ids.holeId)
          const newLs = mutationResult.data.createLiveScore
          return update(prev, {
            scoringSession: {
              course: {
                holes: {
                  [holeIndex]: {
                    liveScores: { $push: [newLs] }
                  }
                }
              }
            }
          })
        }
      }
    })
  })
})

