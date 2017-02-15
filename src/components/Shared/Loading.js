import React from 'react'
import { Text, View } from 'react-native'

const containerStyle = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const Loading = ({ text }) =>
  <View style={containerStyle}>
    <Text style={textStyle}>{ text }</Text>
  </View>


Loading.propTypes = {
  text: React.PropTypes.string
}

Loading.defaultProps = {
  text: 'Startar upp...'
}

export default Loading
