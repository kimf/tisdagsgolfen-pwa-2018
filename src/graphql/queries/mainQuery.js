import { arrayOf, shape, string, bool } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mainQuery = gql`
  query mainQuery {
    user {
      id
      email
      admin
      firstName
      lastName
      photo
      scoringSession(filter: { status_in: "live" }) {
        id
        status
        scoringType
        teamEvent
        scorer {
          id
        }
        course {
          id
          club
          name
        }
      }
    }
    seasons: allSeasons(orderBy: name_DESC) {
      id
      name
      closed
      photo
    }
  }
`;

export default mainQuery;

export const withMainQuery = graphql(mainQuery, {
  skip: ({ loggedIn }) => !loggedIn,
});

export const seasonShape = shape({
  id: string.isRequired,
  closed: bool.isRequired,
  name: string.isRequired,
  photo: shape({
    url: string,
  }),
});

export const mainQueryProps = shape({
  data: shape({
    user: shape({
      id: string.isRequired,
      email: string.isRequired,
      firstName: string.isRequired,
      lastname: string.isRequired,
      scoringSession: shape({
        id: string.isRequired,
        event: shape({
          course: shape({
            name: string.isRequired,
          }),
        }),
      }),
    }),
    seasons: arrayOf(seasonShape),
    loading: bool,
  }),
});
