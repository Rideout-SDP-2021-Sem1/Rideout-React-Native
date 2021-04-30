import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Signup, ForgotPassword } from './auth/index'
import { AuthContext, NavigationContext } from './context'
import { firebase } from '@react-native-firebase/auth'
import {
  MainLayout,
  TestProfile,
  EmptyPage,
  UserProfile,
  MapScreenLayout
} from './pages'

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const [user, setUser] = useState(null)
  const [selectedNavigationIndex, setSelectedNavigationIndex] = useState(0)
  const navigationRef = useRef(null)

  useEffect(() => {
    setUser(firebase.auth().currentUser)
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      // if (user === null) {
      //   navigationRef?.current?.navigate("Login")
      // }
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={user}>
      <NavigationContext.Provider value={{
        index: selectedNavigationIndex,
        setIndex: setSelectedNavigationIndex
      }}>
        <NavigationContainer ref={navigationRef}>
          {
            user !== null
              ?
              <>
                <Navigator headerMode='none' initialRouteName="Map">
                  <Screen name='Map' component={MapScreenLayout} />
                  <Screen name='List' component={EmptyPage} />
                  <Screen name='Profile' component={UserProfile} />
                </Navigator>
              </>
              :
              <>
                <Navigator headerMode='none' initialRouteName="Login">
                  <Screen name='Login' component={Login} />
                  <Screen name='Signup' component={Signup} />
                  <Screen name='ForgotPassword' component={ForgotPassword} />
                </Navigator>
              </>
          }
        </NavigationContainer>
      </NavigationContext.Provider>
    </AuthContext.Provider>
  )

}

export const AppNavigator = () => (
  <>
    <HomeNavigator />
  </>
);