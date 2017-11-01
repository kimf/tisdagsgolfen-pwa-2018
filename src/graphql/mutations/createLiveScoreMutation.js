import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

const createLiveScoreMutation = gql`
  mutation createLiveScore(
    $scoringSessionId: ID!
    $userId: ID
    $teamIndex: Int
    $data: LiveScoreDataInput!
  ) {
    createLiveScore(
      scoringSessionId: $scoringSessionId
      userId: $userId
      teamIndex: $teamIndex
      data: $data
    ) {
      id
      beers
      extraStrokes
      hole
      index
      par
      playerIds
      points
      putts
      strokes
      user {
        id
      }
      teamIndex
    }
  }
`;

export default createLiveScoreMutation;

// ids = { scoringSessionId, userId, teamIndex }
export const withCreateLiveScoreMutation = graphql(createLiveScoreMutation, {
  props: ({ mutate }) => ({
    createLiveScore: (ids, data) =>
      mutate({
        variables: { ...ids, data },
        updateQueries: {
          scoringSession: (prev, { mutationResult }) => {
            // eslint-disable-next-line no-console
            const newLs = mutationResult.data.createLiveScore;
            return update(prev, {
              scoringSession: {
                liveScores: { $push: [newLs] },
              },
            });
          },
        },
      }),
  }),
});
