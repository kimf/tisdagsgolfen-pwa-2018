import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
/* eslint-disable no-console */

const seasonLeaderboardQuery = gql`
  query seasonLeaderboard($seasonId: ID!) {
    seasonLeaderboard(seasonId: $seasonId) {
      id
      photo
      name
      average
      eventCount
      topPoints
      position
      oldAverage
      oldTotalPoints
      prevPosition
      totalPoints
      totalKr
      beers
    }
  }
`;

const withSeasonLeaderboardQuery = graphql(seasonLeaderboardQuery, {
  options: ({ seasonId }) => ({
    variables: { seasonId },
  }),
  name: 'seasonLeaderboard',
});

export default withSeasonLeaderboardQuery;
