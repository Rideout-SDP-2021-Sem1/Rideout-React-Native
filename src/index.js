import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth'

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  input: {
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    borderRadius: 20,
    marginTop: 10
  },
  button: {
    marginTop: 10,
  }
});

const Login = () => {

  const [username, setUsername] = useState < string > ("")
  const [password, setPassword] = useState < string > ("")
  const [user, setUser] = useState < FirebaseAuthTypes.User | null > (null);

  const signIn = async () => {
    try {
      const result = await auth().signInWithEmailAndPassword(username, password);
      console.log("result", result)
    } catch (err) {
      console.error("error signin", err)
    }
  }

  return (
    <View>
      <Text style={styles.header}>Login:</Text>
      <TextInput
        style={styles.input} value={username} onChangeText={(input) => setUsername(input)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input} secureTextEntry={true} value={password} onChangeText={(input) => setPassword(input)}
        placeholder="Password"
      />
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={signIn}
        />
      </View>
    </View>
  );
}
export default Login;