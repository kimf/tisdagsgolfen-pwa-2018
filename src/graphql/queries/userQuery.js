import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const userQuery = gql`
  query getAllUsers {
    players: users {
      id
      email
      firstName
      lastName
      photo
    }
  }
`;
export default userQuery;

export const withUserQuery = graphql(userQuery);
