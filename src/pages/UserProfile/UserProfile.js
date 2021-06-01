import React, { useState, useEffect } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner
} from '@ui-kitten/components';
import { auth } from '../../helper'
import { serverInstance } from '../../instances'
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { exportLocationHistory, clearLocationHistory} from './../../map/MapScreen'

const UserProfile = (props) => {
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

  const [nickname, setNickname] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedLicenseIndex, setSelectedLicenseIndex] = useState(new IndexPath(0));
  const [selectedPaceIndex, setSelectedPaceIndex] = useState(new IndexPath(0));
  const displayLValue = licenseList[selectedLicenseIndex.row];
  const displayPValue = preferredPaceList[selectedPaceIndex.row];
  const [model, setModel] = useState("");
  const [size, setSize] = useState("0");
  const [make, setMake] = useState("");

  const [showDialog, setShowDialog] = useState(false)

  const [waiting, setWaiting] = useState(false)

  const styles = useStyleSheet(themedStyle);

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

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setShowDialog(false)
    } catch (err) {
      console.error("error to log out", err)
    }
  }

  const handlePostUserProfile = async () => {
    try {
      setWaiting(true)
      await serverInstance.post("/update-profile", {
        nickname: nickname,
        bike_details: [{
          make: make,
          model: model,
          size: size
        }],
        license_level: licenseList[selectedLicenseIndex.row],
        preferred_pace: preferredPaceList[selectedPaceIndex.row]
      })
      Alert.alert("Success", "Updated Profile.")
      setWaiting(false)
      setIsEditable(true)
    } catch (err) {
      console.error("error handlePostUserProfile", err)
      Alert.alert("Error", err)
      setWaiting(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverInstance.get("/user")
        const data = response.data
        setNickname(data?.nickname || "")
        const licenseTypeIndex = licenseList.indexOf(data?.license_level || 0)
        const preferredPaceIndex = preferredPaceList.indexOf(data?.preferred_pace || 0)
        setSelectedLicenseIndex(new IndexPath(licenseTypeIndex))
        setSelectedPaceIndex(new IndexPath(preferredPaceIndex))
        setMake(data?.make || "")
        setModel(data?.model || "")
        setSize(data?.size || "")
      } catch (err) {
        console.error("error getting data", err)
      }
    }
    getData()
  }, [])

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView>
          <Image
            style={styles.Logo}
            source={require('./extra/Logo.png')}
          />
        </SafeAreaView>
        <Layout
          level="1"
          style={styles.container}
        >
          <Text
            style={[styles.bottomSpace, styles.TextBox]}
            category='s1'
          >
            RIDER DETAILS
        </Text>
          <Text
            style={styles.subtitleBox}
            category='s1'
          >
            Nickname
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Nickname'
            value={nickname}
            onChangeText={setNickname}
            disabled={isEditable}
          />

          <Text
            style={styles.subtitleBox}
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
            disabled={isEditable}
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
            style={styles.subtitleBox}
            category='s1'
          >
            Preferred Pace
        </Text>
          <Select
            style={styles.bottomSpace}
            placeholder='Select Preferred Pace'
            value={displayPValue}
            selectedIndex={selectedPaceIndex}
            onSelect={index => setSelectedPaceIndex(index)}
            disabled={isEditable}
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
            style={[styles.TextBox]}
            category='s1'
          >
            BIKE DETAILS
        </Text>
          <Text
            style={styles.subtitleBox}
            category='s1'
          >
            Make
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Make'
            value={make}
            onChangeText={setMake}
            disabled={isEditable}
          />

          <Text
            style={styles.subtitleBox}
            category='s1'
          >
            Model
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Model'
            value={model}
            onChangeText={setModel}
            disabled={isEditable}

          />

          <Text
            style={styles.subtitleBox}
            category='s1'
          >
            Size
        </Text>
          <Input
            style={styles.bottomSpace}
            placeholder='Size'
            value={size}
            onChangeText={(text) => checkSize(text)}
            disabled={isEditable}

          />
          <Button
            style={{
              backgroundColor: isEditable ? '#27afe2' : 'green',
              borderColor: isEditable ? '#27afe2' : 'green',
              marginHorizontal: 24,
              marginTop: 24,
            }}
            onPress={() => {
              if (isEditable) {
                // Allow editing
                setIsEditable(false)
              } else {
                // POST the new user data
                handlePostUserProfile()
              }
            }}
            size='giant'
          >
            {
              isEditable ? "Edit Profile" : "Save Profile"
}
          </Button>

          <Button
            style={{
              marginHorizontal: 24,
              marginTop: 24,
            }}
            status='danger'
            appearance='outline'
            size='giant'
            onPress={() => {
              setShowDialog(true)
            }}
          >
            Log Out
        </Button>

        <Button
         style={{
          marginHorizontal: 24,
          marginTop: 24,
        }}
        status='warning'
        appearance='outline'
        size='giant'
        onPress={() => {
          exportLocationHistory
        }}
        >
          Location History
        </Button>

        <Button
         style={{
          marginHorizontal: 24,
          marginTop: 24,
        }}
        status='warning'
        appearance='outline'
        size='giant'
        onPress={() => {
          clearLocationHistory
        }}
        >
          Clear Location History
        </Button>

        </Layout>
      </ScrollView>
      <Modal
        visible={showDialog}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        onBackdropPress={() => setShowDialog(false)}
      >
        <Card>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Text
              category="p1"
            >
              Are you sure you want to sign out?
            </Text>
            <Button
              appearance="filled"
              status="primary"
              style={{
                width: "50%",
                marginTop: 20
              }}
              onPress={() => handleLogout()}
            >
              Yes
            </Button>
            <Button
              appearance="filled"
              status="danger"
              style={{
                width: "50%",
                marginTop: 20
              }}
              onPress={() => setShowDialog(false)}
            >
              No
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  );
};

export default UserProfile

const themedStyle = StyleService.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffff"
  },
  contentContainer: {
    paddingVertical: 24,
  },
  TextBox: {
    marginTop: 30,
    alignSelf: 'center'
  },
  subtitleBox: {
    marginHorizontal: 10
    
  },
  Logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  bottomSpace: {
    marginBottom: 20
  }
});
