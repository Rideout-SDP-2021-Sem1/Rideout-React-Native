import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Signup, ForgotPassword } from './auth/index'
import { AuthContext } from './context/AuthContext'
import { firebase } from '@react-native-firebase/auth'
import { MainLayout } from './pages'

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const [user, setUser] = useState({
    some_text: "ok"
  })
  const navigationRef = useRef(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      if (user === null) {
        navigationRef?.current?.navigate("Login")
      }
    })
    return unsubscribe
  }, [])
  console.log("user main", user)

  return (
    <AuthContext.Provider value={user}>
      <NavigationContainer ref={navigationRef}>
        {
          user === null
            ?
            <>
              <Navigator headerMode='none' initialRouteName="Login">
                <Screen name='Login' component={Login} />
                <Screen name='Signup' component={Signup} />
                <Screen name='ForgotPassword' component={ForgotPassword} />
              </Navigator>
            </>
            :
            <>
              <Navigator headerMode='none'>
                <Screen name='Home' component={MainLayout} />
              </Navigator>
            </>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )

}

export const AppNavigator = () => (
  <>
    <HomeNavigator />
  </>
);