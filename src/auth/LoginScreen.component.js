import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {signIn} from '../helper/auth';
import { Button, Layout, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 20,
  },
  input: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    color: 'black',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonView: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [counter, setCounter] = React.useState(0);
  const signInHandler = async () => {
    try {
      if (email.trim() === '') {
        Alert.alert('Error', 'No email entered.');
        return;
      }
      if (password.trim() === '') {
        Alert.alert('Error', 'No password entered.');
        return;
      }
      const result = await signIn(email, password);
      Alert.alert(`Success`, `Logged with the ${result.email} email`);
    } catch (err) {
      Alert.alert(`Error`, `Incorrect login details.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Login:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={input => setEmail(input)}
        placeholder="Email"
        defaultValue="Email"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={input => setPassword(input)}
        placeholder="Password"
        defaultValue="Password"
      />
      <View style={styles.buttonView}>
        <Button title="Login" onPress={signInHandler} />
      </View> */}
      <Button onPress={() => setCounter(counter + 1)}>
        BUTTON
      </Button>

      <Text style={styles.text}>
        Pressed {counter} times
      </Text>
    </View>
  );
};

export default Login;
