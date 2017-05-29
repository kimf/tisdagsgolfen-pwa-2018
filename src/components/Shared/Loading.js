import React from 'react'

const containerStyle = {
  backgroundColor: '#eee'
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const Loading = ({ text }) =>
  <div style={containerStyle}>
    <span style={textStyle}>{ text }</span>
  </div>


Loading.propTypes = {
  text: React.PropTypes.string
}

Loading.defaultProps = {
  text: 'Startar upp...'
}

export default Loading
