import React from 'react'

const styles = {
  container: {
    flex: 3,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 210
  }
}

const Logo = () =>
  <div className="container">
    <img src="/logo.png" style={styles.image} alt="Tisdagsgolfen" />
  </div>

export default Logo
