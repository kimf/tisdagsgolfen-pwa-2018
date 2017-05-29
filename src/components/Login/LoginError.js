import React from 'react'

const styles = {
  errorText: {
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
    width: 'calc(100% - 40px)',
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20
  }
}

const LoginError = () => (
  <span style={styles.errorText}>
    Något gick fel, se över infon
  </span>
)

export default LoginError
