import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const scoringSessionMutation = gql`
  mutation createScoringSession(
    $courseId: ID!
    $scorerId: ID!
    $teamEvent: Boolean!
    $scoringType: String!
    $scoringItems: [ScoringItemInput!]
    $startsAt: String!
  ) {
    createScoringSession(
      courseId: $courseId
      scorerId: $scorerId
      teamEvent: $teamEvent
      scoringType: $scoringType
      scoringItems: $scoringItems
      startsAt: $startsAt
      currentHole: 1
    ) {
      id
      course {
        id
        club
        name
      }
      scoringType
      teamEvent
    }
  }
`;

export default scoringSessionMutation;

export const withCreateScoringSessionMutation = graphql(
  scoringSessionMutation,
  {
    props: ({ mutate }) => ({
      createScoringSession: (
        courseId,
        scorerId,
        teamEvent,
        scoringType,
        scoringItems,
      ) =>
        mutate({
          variables: {
            courseId,
            scorerId,
            teamEvent,
            scoringType,
            scoringItems,
            startsAt: new Date(),
          },
        }),
    }),
  },
);
