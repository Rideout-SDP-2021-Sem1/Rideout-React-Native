import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Signup, ForgotPassword } from './auth/index'
import { AuthContext, NavigationContext, SocketProvider } from './context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firebase } from '@react-native-firebase/auth'
import {
  UserProfile,
  MapScreenLayout,
  GroupListLayout,
  GroupCreateLayout,
  AdminViewGroup
} from './pages'

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const [user, setUser] = useState(null)
  const [display, setDisplay] = useState(false)
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
      <SocketProvider>
        <NavigationContext.Provider value={{
          index: selectedNavigationIndex,
          setIndex: setSelectedNavigationIndex
        }}>
          <NavigationContainer ref={navigationRef}>
            {
              user !== null
                ?
                <>
                  <Tab.Navigator headerMode='none' initialRouteName="Map" screenOptions={{
                    tabBarVisible: false
                  }}>
                    <Tab.Screen name='Map' component={MapScreenLayout} />
                    <Tab.Screen name='List' component={GroupListLayout} />
                    <Tab.Screen name='Profile' component={UserProfile} />
                    <Tab.Screen name="CreateEvent" component={GroupCreateLayout} />
                    <Tab.Screen name="AdminViewGroup" component={AdminViewGroup} />
                  </Tab.Navigator>
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
      </SocketProvider>
    </AuthContext.Provider>
  )

}

export const AppNavigator = () => (
  <>
    <HomeNavigator />
  </>
);