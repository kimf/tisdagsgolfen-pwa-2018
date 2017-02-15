import React from 'react'

const containerStyle = {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1
}

const imageStyle = {
  marginBottom: 40
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const EmptyState = ({ text }) =>
  <div style={containerStyle}>
    <img style={imageStyle} src="/emptystate.png" alt={text} />
    <span style={textStyle}>{ text }</span>
  </div>

EmptyState.propTypes = {
  text: React.PropTypes.string
}

EmptyState.defaultProps = {
  text: 'Inget att visa... ännu :('
}

export default EmptyState
