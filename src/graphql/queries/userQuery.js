import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const userQuery = gql`
  query getAllUsers {
    players: allUsers (
      orderBy: firstName_ASC
    ) {
      id
      email
      firstName
      lastName
      photo
    }
  }
`
export default userQuery

export const withUserQuery = graphql(userQuery)
