import React, { useState, useEffect } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, Icon
} from '@ui-kitten/components';
import { serverInstance } from '../../instances'

export const AdminViewGroup = (props) => {
  const { navigation, Id } = props
  
  const [waiting, setWaiting] = useState(false)

  const styles = themedStyle

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

  const navigateToGroupRides = () => {
    navigation && navigation.navigate("List")
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverInstance.get("/user")
        const data = response.data
        console.log("data", data)
        // setNickname(data?.nickname || "")
        // const licenseTypeIndex = licenseList.indexOf(data?.license_level || 0)
        // const preferredPaceIndex = preferredPaceList.indexOf(data?.preferred_pace || 0)
        // setSelectedLicenseIndex(new IndexPath(licenseTypeIndex))
        // setSelectedPaceIndex(new IndexPath(preferredPaceIndex))
        // setMake(data?.make || "")
        // setModel(data?.model || "")
        // setSize(data?.size || "")
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
      >
        <SafeAreaView
          style={styles.container}
        >
          <Layout>
            <Button
              style={{
                marginLeft: 0,
                width: 100,
              }}
              status='basic'
              appearance='ghost'
              // accessoryLeft={renderBackIcon}
              onPress={() => navigateToGroupRides()}

            >
              Group Rides
            </Button>
            <Image
              style={styles.Logo}
              source={require('../UserProfile/extra/Logo.png')}
            />
          </Layout>
          <Text>
            {`Get information from the server about this group ride.`}
          </Text>
        </SafeAreaView>
      </ScrollView>

    </>
  );
};


const themedStyle = StyleService.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white"
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
