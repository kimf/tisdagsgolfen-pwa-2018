import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

const Profile = ({ data: { loading, user }, onLogout, goBack }) => {
  if (loading) { return null }

  return (
    <div className="wrapper">
      <h2>{user.firstName} {user.lastName}</h2>
      <button onClick={goBack}>Avbryt</button>

      <div style={{ marginTop: 22 }}>
        Hej {user.firstName}
        <hr />
        <button onClick={() => { onLogout(user.email, goBack) }}>LOGGA UT</button>
      </div>
    </div>
  )
}

const { shape, bool, string, func } = React.PropTypes

Profile.propTypes = {
  data: shape({
    loading: bool,
    user: shape({
      firstName: string,
      email: string
    })
  }).isRequired,
  onLogout: func.isRequired,
  goBack: func.isRequired
}

Profile.defaultProps = {
  data: {
    loading: true,
    user: {
      firstName: '',
      lastName: ''
    }
  }
}

const userQuery = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
  }
`

export default graphql(userQuery)(withRouter(Profile))
