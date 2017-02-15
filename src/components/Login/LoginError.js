import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
    width: DEVICE_WIDTH - 40,
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20
  }
})

const LoginError = () => (
  <View style={styles.container}>
    <Text style={styles.errorText}>
      Något gick fel, se över infon
    </Text>
  </View>
)

export default LoginError
