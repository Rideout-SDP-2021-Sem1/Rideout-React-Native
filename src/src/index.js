import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LoginScreen} from './auth';
import {Group} from './Group/GroupUi';
export {default as Header} from './Group/Header';
export {default as Footer} from './Group/Header';
export {default as CreateGroup} from './Group/GroupPost';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Group />
    </View>
  );
};

export default App;
