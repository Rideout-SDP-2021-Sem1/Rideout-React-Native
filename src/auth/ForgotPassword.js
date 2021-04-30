import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Modal, Spinner } from '@ui-kitten/components';
import ImageOverlay from "react-native-image-overlay"; // npm install --save react-native-image-overlay 
import { resetPassword } from '../helper/auth';

export default ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [waiting, setWaiting] = useState(false)

  const styles = useStyleSheet(themedStyles);

  const resetPasswordHandler = async () => {
    try {
      if (String(email).trim() === '') {
        Alert.alert('Error', 'No email entered.');
        return;
      }
      setWaiting(true)

      await resetPassword(email)
      Alert.alert(`Success`, `Reset password email sent.`);
    } catch (err) {
      Alert.alert(`Error`, err.message);
    } finally {
      setWaiting(false)
    }
  };

  return (
    <>
      <Modal
        visible={waiting}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        <Spinner size="giant" />
      </Modal>
      <View style={styles.container}>
        <ImageOverlay
          source={require('./Road.jpeg')}
          style={{
            width: 500,
            height: 210
          }}
        >
          <>
            <Text
              category='h1'
              status='control'>
              UH OH!
          </Text>
            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              Don't worry, we just need your email :)
          </Text>
          </>
        </ImageOverlay>
        <Layout
          style={styles.formContainer}
          level='1'>
          <Input
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Layout>
        <Button
          style={styles.signInButton}
          size='giant'
          onPress={resetPasswordHandler}>
          SEND EMAIL
        </Button>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='basic'
          onPress={() => navigation.push("Signup")}>
          Don't have an account? Create
        </Button>
      </View>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    minHeight: 216,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    flex: 1
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
