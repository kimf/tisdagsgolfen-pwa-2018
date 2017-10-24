import React from 'react'
import { string } from 'prop-types'

const containerStyle = {
  backgroundColor: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column'
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const EmptyState = ({ text }) =>
  (<div style={containerStyle}>
    <img src="/emptystate.png" alt={text} style={{ maxWidth: '100%' }} />
    <span style={textStyle}>{text}</span>
   </div>)

EmptyState.propTypes = {
  text: string
}

EmptyState.defaultProps = {
  text: 'Inget att visa... ännu :('
}

export default EmptyState
