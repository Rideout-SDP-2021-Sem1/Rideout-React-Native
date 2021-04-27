import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapScreen } from './map'
import { LoginScreen } from './auth'


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  }
})

const App = () => {
  return (
    /*<View style={styles.container}>
      <LoginScreen />
    </View>*/
    <MapScreen />
  )
}

export default App