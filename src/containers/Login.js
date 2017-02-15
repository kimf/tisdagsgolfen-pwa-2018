import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LoginError from '../components/Login/LoginError'
import Form from '../components/Login/LoginForm'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: props.email || '',
      password: '',
      loggingIn: false,
      error: null
    }
  }

  onSubmit = () => {
    this.setState({ loggingIn: true })
    const { email, password } = this.state
    this.props.signinUser({ variables: { email, password } })
      .then((response) => {
        this.props.onLogin(email, response.data.signinUser.token)
        this.setState({ loggingIn: false, error: false })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, loggingIn: false })
      })
  }

  changeValue = (valueObject) => {
    this.setState(valueObject)
  }

  render() {
    const { loggingIn, error, email, password } = this.state

    return (
      <div className="container">
        {error ? <LoginError /> : null}
        <Form
          email={email}
          password={password}
          changeValue={this.changeValue}
        />
        <button onClick={loggingIn ? () => {} : this.onSubmit}>LOGGA IN</button>
      </div>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

Login.defaultProps = {
  email: ''
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

export default graphql(signinUser, { name: 'signinUser' })(Login)
