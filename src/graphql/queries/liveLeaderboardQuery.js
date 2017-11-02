import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery($scoringSessionId: ID!) {
    liveLeaderboard(scoringSessionId: $scoringSessionId) {
      id
      position
      photo
      name
      beers
      kr
      points
      strokes
    }
  }
`;

export default liveLeaderboardQuery;

export const withLiveLeaderboardQuery = graphql(liveLeaderboardQuery, {
  options: ({ scoringSessionId }) => ({
    variables: { scoringSessionId },
    fetchPolicy: 'network-only',
    pollInterval: 30000,
  }),
});
