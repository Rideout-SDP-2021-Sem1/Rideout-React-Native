import React, { ReactElement } from 'react';
import { View, TouchableWithoutFeedback, Alert,ScrollView } from 'react-native';
import {IndexPath, Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, Select,SelectItem} from '@ui-kitten/components';
import ImageOverlay from "react-native-image-overlay"; // npm install --save react-native-image-overlay 
import {signIn} from '../helper/auth';
// import { PersonIcon } from './extra/icons';
// import { KeyboardAvoidingView } from './extra/3rd-party';


export default ({ navigation }) => {


  const HeartIcon = (props) => (
    <Icon {...props} name='heart'/>
  );

  const StarIcon = (props) => (
    <Icon {...props} name='star'/>
  );

  const Ldata = [
    'Learners',
    'Restricted',
    'Full',
  ];
  const Pdata = [
    'Relaxed',
    'Mixed',
    'Spirited',
  ];
  
    const [email, setEmail] = React.useState();
    const [make, setMake] = React.useState();
    const [model, setModel] = React.useState();

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [selectedLIndex, setSelectedLIndex] = React.useState(new IndexPath(0)); 
    const [selectedPIndex, setSelectedPIndex] = React.useState(new IndexPath(0)); 
    const displayLValue = Ldata[selectedLIndex.row];
    const displayPValue = Pdata[selectedPIndex.row];

  

    const styles = useStyleSheet(themedStyles);
  
    const onSignUpButtonPress = () => {
      navigation && navigation.navigate('SignUp2');
    };
  
    const onForgotPasswordButtonPress = () => {
      navigation && navigation.navigate('ForgotPassword');
    };

    const renderOption = (title) => (
      <SelectItem title={title}/>
    );
  
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
        if (username === '' ) {
          Alert.alert('Error', 'Invalid Username.');
          return;
        }
        if(username.includes(' ') || username.includes('@')){
          Alert.alert('Error', 'Username cannot contain a space or "@"');
          return;
        }
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
        source={require ('./Bike.jpg')}
        style={{
            width: 500,
            height: 210
        }}
        >
          <Text 
          category='h1'
           status='control'>
            SignUp
          </Text>  

          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Let's get you signed up to RIDE OUT!
          </Text>
        </ImageOverlay>
        
        <ScrollView
          style={styles.formContainer}
          level='1'>
            <Text
        style = 's1'
        >
          Username 
        </Text>
          <Input
          style={styles.bottomSpace}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
          />
          <Text
        style = 's1'
        >
          Email
        </Text>
          <Input
          style={styles.bottomSpace}
          placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <Text
        style = 's1'
        >
          Password 
        </Text>
          <Input
          style={styles.bottomSpace}
          placeholder='Password'
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
        
        <Text
        style = 's1'
        >
          License Type
        </Text>
        <Select
        style={styles.select}
        placeholder='Select License Type'
        value={displayLValue}
        selectedIndex={selectedLIndex}
        onSelect={index => setSelectedLIndex(index)}>
        {Ldata.map(renderOption)}
      </Select>
      <Text
        style = 's1'
        >

          Preferred Pace 
        </Text>
      <Select
          style={styles.bottomSpace}
          placeholder='Select License Type'
        value={displayPValue}
        selectedIndex={selectedPIndex}
        onSelect={index => setSelectedPIndex(index)}>
        {Pdata.map(renderOption)}
      </Select>
      <Text
          style={styles.bottomSpace}
          category = 's1'
      >
          BIKE DETAILS
        </Text>
        <Text
        style = 'S1'

        >
          Make
        </Text>
          <Input
          style={styles.bottomSpace}
          placeholder='Make'
            value={make}
            onChangeText={setMake}
          />

        <Text
        style = 'h1'
        >
          Model
        </Text>
          <Input
            // style={styles.passwordInput}
            placeholder='Model'
            value={model}
            onChangeText={setModel}
          />
          <Button
          style={styles.signInButton}
          size='giant'
          onPress = {signInHandler}>
          SIGN UP
        </Button>
       
        </ScrollView>

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
      minHeight: 150,
      
    //   backgroundColor: 'color-primary-default',
    },
    formContainer: {
      backgroundColor: 'white',
      flex: 1,
      paddingTop: 25,
      paddingHorizontal: 16,
      minHeight: 150,
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
    select: {
      // flex: 1,
      margin: 2,
    },
    bottomSpace: {
      marginBottom: 20
    }
  });
  