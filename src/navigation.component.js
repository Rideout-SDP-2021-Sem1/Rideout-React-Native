import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, ForgotPassword } from './auth/index';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={Login} />
    <Screen name='Signup' component={Signup} />
    <Screen name='ForgotPassword' component={ForgotPassword} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);