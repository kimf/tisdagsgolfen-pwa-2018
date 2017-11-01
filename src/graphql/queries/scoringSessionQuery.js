import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const scoringSessionQuery = gql`
  query scoringSession($scoringSessionId: ID!) {
    scoringSession(id: $scoringSessionId) {
      id
      currentHole
      scoringType
      teamEvent
      course {
        id
        club
        name
        par
        holes {
          id
          number
          par
          index
        }
      }
      scoringItems {
        extraStrokes
        users {
          id
          firstName
          lastName
          photo
        }
      }
      liveScores {
        id
        user {
          id
        }
        teamIndex
        beers
        extraStrokes
        hole
        index
        par
        playerIds
        points
        putts
        strokes
      }
    }
  }
`;
export default scoringSessionQuery;

export const withScoringSessionQuery = graphql(scoringSessionQuery, {
  options: ({ scoringSessionId }) => ({
    variables: { scoringSessionId },
  }),
});
