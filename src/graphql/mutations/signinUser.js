import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export default signinUser

export const withSigninUserMutation = graphql(signinUser, {
  name: 'signinUser'
})
