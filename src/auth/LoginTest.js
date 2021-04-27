import React, { ReactElement } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon } from '@ui-kitten/components';
import ImageOverlay from "react-native-image-overlay"; // npm install --save react-native-image-overlay 
import { signIn } from '../helper/auth';
// import { PersonIcon } from './extra/icons';
// import { KeyboardAvoidingView } from './extra/3rd-party';

export default ({ navigation }) => {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

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
      if (email === '') {
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
            An app by Khaled
          </Text>
        </>
      </ImageOverlay>
      {/* <View style={styles.headerContainer}>
        <Text
            
            category='h1'
            status='control'
            >
            RIDE OUT
        </Text>   
            <ImageBackground
            source={require ('./Road.jpeg')}
            style={{
                width: 500,
                height: 210
            }}
            >
            </ImageBackground>

          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            AUT's Only Biker Social Media
          </Text>
        </View> */}
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
