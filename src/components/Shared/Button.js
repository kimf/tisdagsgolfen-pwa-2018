import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingVertical: 10,
    margin: 10
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
})

const Button = ({ onClick, text, backgroundColor, color }) =>
  <TouchableOpacity
    style={[styles.button, { backgroundColor }]}
    onClick={onClick}
    activeOpacity={1}
  >
    <Text style={[styles.text, { color }]}>{text}</Text>
  </TouchableOpacity>


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
