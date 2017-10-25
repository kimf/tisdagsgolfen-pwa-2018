import React from 'react';
import { string, func } from 'prop-types';

const LoginForm = ({ email, password, changeValue, onSubmit }) => (
  <form className="form" onSubmit={onSubmit}>
    <div className="inputWrapper">
      <label htmlFor="email">E-post</label>
      <input
        name="email"
        type="email"
        onChange={event => changeValue({ email: event.target.value })}
        value={email}
      />
    </div>
    <div className="inputWrapper">
      <label htmlFor="password">Lösenord</label>
      <input
        name="password"
        type="password"
        onChange={event => changeValue({ password: event.target.value })}
        value={password}
      />
    </div>
    <button onClick={onSubmit}>LOGGA IN</button>
  </form>
);

LoginForm.propTypes = {
  email: string,
  password: string,
  changeValue: func.isRequired,
  onSubmit: func.isRequired,
};

LoginForm.defaultProps = {
  email: '',
  password: '',
};

export default LoginForm;
