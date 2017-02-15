import React from 'react'

const LoginForm = ({ email, password, changeValue }) =>
  <div className="container">
    <div className="inputWrapper">
      <img src="/username.png" alt="Username" />
      <input
        autoCorrect={false}
        type="email"
        onChange={event => changeValue({ email: event.target.value })}
        value={email}
      />
    </div>
    <div className="inputWrapper">
      <img src="/password.png" alt="Password" />
      <input
        type="password"
        autoCorrect={false}
        onChange={event => changeValue({ password: event.target.value })}
        value={password}
      />
    </div>
  </div>


const { string, func } = React.PropTypes

LoginForm.propTypes = {
  email: string,
  password: string,
  changeValue: func.isRequired
}

LoginForm.defaultProps = {
  email: '',
  password: ''
}


export default LoginForm
