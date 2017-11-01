/* eslint-disable no-console */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const events = gql`
  query events($seasonId: ID!) {
    events(seasonId: $seasonId) {
      id
      status
      startsAt
      scoringType
      teamEvent
      course
    }
  }
`;

const withEventsQuery = graphql(events, {
  options: ({ seasonId }) => ({
    variables: { seasonId },
  }),
  name: 'events',
});

export default withEventsQuery;
