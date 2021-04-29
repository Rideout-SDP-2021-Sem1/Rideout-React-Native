import React, { useState } from 'react';
import { ScrollView, Image, SafeAreaView, View } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card
} from '@ui-kitten/components';
import { auth } from '../../helper'

const UserProfile = (props) => {
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

  const [nickname, setNickname] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedLIndex, setSelectedLIndex] = useState(new IndexPath(0));
  const [selectedPIndex, setSelectedPIndex] = useState(new IndexPath(0));
  const displayLValue = Ldata[selectedLIndex.row];
  const displayPValue = Pdata[selectedPIndex.row];
  const [model, setModel] = useState("");
  const [size, setSize] = useState("0");
  const [make, setMake] = useState("");

  const [showDialog, setShowDialog] = useState(false)

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

  const updateEditable = () => {
    setIsEditable(!isEditable)
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setShowDialog(false)
    } catch (err) {
      console.error("error to log out", err)
    }
  }

  return (
    <>
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
            value={username}
            onChangeText={setUsername}
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
            selectedIndex={selectedLIndex}
            onSelect={index => setSelectedLIndex(index)}
            disabled={isEditable}
          >
            {
              Ldata.map((license) => {
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
            selectedIndex={selectedPIndex}
            onSelect={index => setSelectedPIndex(index)}
            disabled={isEditable}
          >
            {
              Pdata.map((pace) => {
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
              backgroundColor: isEditable ? 'blue' : 'green',
              marginHorizontal: 24,
              marginTop: 24,
            }}
            onPress={updateEditable}
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
        </Layout>
      </ScrollView>
      <Modal
        visible={showDialog}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
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
