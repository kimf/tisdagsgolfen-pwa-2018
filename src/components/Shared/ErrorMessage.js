import React from 'react';
import { string } from 'prop-types';

const styles = {
  errorText: {
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
    width: '100%',
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
};

const ErrorMessage = ({ text }) => <span style={styles.errorText}>{text}</span>;

ErrorMessage.propTypes = {
  text: string.isRequired,
};

export default ErrorMessage;
