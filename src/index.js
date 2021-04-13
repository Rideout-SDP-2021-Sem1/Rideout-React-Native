import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LoginScreen } from './auth'


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  }
})

const App = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  )
}

export default App