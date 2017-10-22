import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'

import ErrorMessage from '../components/Shared/ErrorMessage'
import Form from '../components/Login/LoginForm'
import Logo from '../components/Login/Logo'

import { login } from '../actions/app'
import { withSigninUserMutation } from '../graphql/mutations/signinUser'

class Login extends Component {
  static propTypes = {
    email: string,
    signinUser: func.isRequired,
    onLogin: func.isRequired
  }

  static defaultProps = {
    email: ''
  }

  constructor(props) {
    super(props)

    this.state = {
      email: props.email || '',
      password: '',
      loggingIn: false,
      error: null
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ loggingIn: true })
    const { email, password } = this.state
    this.props.signinUser({ variables: { email, password } })
      .then((response) => {
        this.props.onLogin(email, response.data.authenticateUser.token)
        this.setState({ loggingIn: false, error: false })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error, loggingIn: false })
      })
  }

  changeValue = (valueObject) => {
    this.setState(valueObject)
  }

  render() {
    const { loggingIn, error, email, password } = this.state

    return (
      <div className="login center">
        <Logo />
        {error ? <ErrorMessage text="Något gick fel, se över infon" /> : null}
        <h1>Logga in</h1>
        <Form
          email={email}
          password={password}
          changeValue={this.changeValue}
          onSubmit={loggingIn ? () => { } : this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({ email: state.app.email })

const mapDispatchToProps = dispatch => ({
  onLogin: (email, token) => dispatch(login(email, token))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSigninUserMutation
)(Login)
