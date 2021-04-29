import React, { useContext } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, Modal, Spinner } from '@ui-kitten/components';
import ImageOverlay from "react-native-image-overlay";
import { signIn } from '../helper/auth';
import { AuthContext } from '../context/AuthContext'

export default ({ navigation }) => {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const userObj = useContext(AuthContext)
  const [waiting, setWaiting] = React.useState(false)

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignUp2');
  };

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const signInHandler = async () => {
    try {
      if (String(email).trim() === '') {
        Alert.alert('Error', 'No email entered.');
        return;
      }
      if (String(password).trim() === '') {
        Alert.alert('Error', 'No password entered.');
        return;
      }
      setWaiting(true)
      await signIn(email, password);
    } catch (err) {
      Alert.alert(`Error`, `Incorrect login details.`);
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
          source={require('./Bike.jpg')}
          style={{
            width: 500,
            height: 210
          }}
        >
          <>
            <Text
              category='h1'
              status='control'>
              RIDE OUT
          </Text>

            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              An app by Khaled for Khaled
          </Text>
          </>
        </ImageOverlay>
        <Layout
          style={styles.formContainer}
          level='1'>
          <Input
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            placeholder='Password'
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              status='basic'
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
        </Layout>
        <Button
          style={styles.signInButton}
          size='giant'
          onPress={signInHandler}>
          SIGN IN
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
    // backgroundColor: 'royalblue',
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