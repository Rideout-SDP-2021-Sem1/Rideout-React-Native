import React from 'react';
import {View, StyleSheet} from 'react-native';
// import {LoginTest} from './auth';
import * as eva from '@eva-design/eva';
// import { ApplicationProvider} from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './navigation.component';
import {LoginTest, Signup} from './auth/index'

// const AuthStack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

function loginScreen(){
  <View style={styles.container}>
  <LoginTest />
</View>
}

const App = () => {
  return (
    <>
  <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator/>
    </ApplicationProvider>
    </>
//     <ApplicationProvider {...eva} theme={eva.light}>
//      <View style={styles.container}>
//        <Signup/>
//      </View>
//      </ApplicationProvider>
  );
};

// export default App;
export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator/>
    </ApplicationProvider>
  </>
);