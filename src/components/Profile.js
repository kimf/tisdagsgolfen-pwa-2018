import React from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';

import Header from './Shared/Header';

import { logout } from '../actions/app';

const Profile = ({ user, onLogout }) => [
  <Header title={`${user.firstName} ${user.lastName}`} showPhoto goBack />,
  <div className="container">
    <a
      href="#logout"
      className="button"
      onClick={e => {
        e.preventDefault();
        onLogout(user.email);
      }}
    >
      LOGGA UT
    </a>
  </div>,
];

Profile.propTypes = {
  user: shape().isRequired,
  onLogout: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Profile);
