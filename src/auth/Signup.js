import React, { useState, useContext } from 'react';
import { View, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import {
  IndexPath, Button, Input, Layout, StyleService, Text, useStyleSheet,
  Icon, Select, SelectItem, Modal, Spinner
} from '@ui-kitten/components';
import ImageOverlay from "react-native-image-overlay";
import { auth } from '../helper';
import { serverInstance } from '../instances'
import { NavigationContext } from '../context'

export default ({ navigation }) => {

  const HeartIcon = (props) => (
    <Icon {...props} name='heart' />
  );

  const StarIcon = (props) => (
    <Icon {...props} name='star' />
  );

  const licenseList = [
    'Learners',
    'Restricted',
    'Full',
  ];
  const preferredPaceList = [
    'Relaxed',
    'Mixed',
    'Spirited',
  ];

  const navigationContext = useContext(NavigationContext)

  const [email, setEmail] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [size, setSize] = useState("0");

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedLicenseIndex, setSelectedLicenseIndex] = useState(new IndexPath(0));
  const [selectedPaceIndex, setSelectedPaceIndex] = useState(new IndexPath(0));
  const displayLValue = licenseList[selectedLicenseIndex.row];
  const displayPValue = preferredPaceList[selectedPaceIndex.row];

  const [waiting, setWaiting] = useState(false)

  const styles = useStyleSheet(themedStyles)

  const signUpHandler = async () => {
    try {
      if (email === '') {
        Alert.alert('Error', 'No email entered.');
        return;
      }
      if (password.trim() === '') {
        Alert.alert('Error', 'No password entered.');
        return;
      }

      if (password !== rePassword) {
        Alert.alert('Error', 'The password does not match.');
        return;
      }

      // Sign up the user with the authentication provider
      setWaiting(true)
      navigationContext.setIndex(0)
      const { user } = await auth.signUp(email, password)

      const signUpPayload = {
        uid: user.uid,
        nickname: nickname,
        email: email,
        bike_details: {
          make: make,
          model: model,
          size: size
        },
        license_level: licenseList[selectedLicenseIndex.row],
        preferred_pace: preferredPaceList[selectedPaceIndex.row]
      }

      await serverInstance.post("/user", {
        data: signUpPayload
      })
      setWaiting(false)
    } catch (err) {
      console.error("err", err)
      Alert.alert(`Error`, err?.message);
      setWaiting(false)
    }
  };

  const checkSize = (size) => {
    let number = ""
    for (const letter of size) {
      const parsed = parseInt(letter, 10)
      if (!isNaN(parsed)) {
        number += letter
      }
    }
    setSize(number)
  }

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
              Sign Up
          </Text>
            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              Let's get you signed up to RIDE OUT!
          </Text>
          </>
        </ImageOverlay>

        <ScrollView
          style={styles.formContainer}
          level='1'
        >
          <Text
            category='s1'
          >
            Nickname
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Nickname'
            value={nickname}
            onChangeText={setNickname}
          />
          <Text
            category='s1'
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
            category='s1'
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
            category='s1'
          >
            Re-Enter Password
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Password'
            value={rePassword}
            secureTextEntry={!passwordVisible}
            onChangeText={setRePassword}
          />

          <Text
            category='s1'
          >
            License Type
        </Text>
          <Select
            style={styles.bottomSpace}
            placeholder='Select License Type'
            value={displayLValue}
            selectedIndex={selectedLicenseIndex}
            onSelect={index => setSelectedLicenseIndex(index)}
          >
            {
              licenseList.map((license) => {
                return (
                  <SelectItem key={license} title={license} />
                )
              })
            }
          </Select>
          <Text
            category='s1'
          >
            Preferred Pace
        </Text>
          <Select
            style={styles.bottomSpace}
            placeholder='Select License Type'
            value={displayPValue}
            selectedIndex={selectedPaceIndex}
            onSelect={index => setSelectedPaceIndex(index)}
          >
            {
              preferredPaceList.map((pace) => {
                return (
                  <SelectItem key={pace} title={pace} />
                )
              })
            }
          </Select>
          <Text
            category='s1'
          >
            BIKE DETAILS
        </Text>
          <View
            style={{
              marginTop: 20
            }}
          >
            <Text
              category='s1'
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
              category='s1'
            >
              Model
          </Text>
            <Input
              style={styles.bottomSpace}
              placeholder='Model'
              value={model}
              onChangeText={setModel}
            />

            <Text
              category='s1'
            >
              Size
          </Text>
            <Input
              style={styles.bottomSpace}
              placeholder='Size'
              value={size}
              onChangeText={(text) => checkSize(text)}
            />
          </View>
          <Button
            style={[styles.signUpButton, styles.bottomSpace, {
              marginBottom: 50
            }]}
            size='giant'
            onPress={signUpHandler}>
            SIGN UP
        </Button>

        </ScrollView>
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
    minHeight: 150,

    //   backgroundColor: 'color-primary-default',
  },
  formContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 16,
    minHeight: 150
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
    marginBottom: 30
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // signUpButton: {
  //   marginTop: 16,
  // },
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
