import React from 'react'

const Button = ({ onClick, text, backgroundColor, color }) =>
  <div style={{backgroundColor}} onClick={onClick}>
    <span style={{color}}>{text}</span>
  </div>


const { string, func } = React.PropTypes
Button.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired,
  backgroundColor: string,
  color: string
}

Button.defaultProps = {
  backgroundColor: '#ccc',
  color: '#444'
}

export default Button
