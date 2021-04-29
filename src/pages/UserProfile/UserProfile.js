import React from 'react';
import { ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import { IndexPath, Button, StyleService, useStyleSheet,Input, Select, SelectItem, Text } from '@ui-kitten/components';
// import { CameraIcon } from './extra/icons';
import { Profile } from './extra/data';
import react from 'react';
import { color } from 'react-native-reanimated';

const profile= Profile.jenniferGreen();

const UserProfile = ({ navigation }) => {
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

  const [nickname, setNickname] = react.useState("");
  const [isEditable, setIsEditable] = react.useState(true);
  const [username, setUsername] = react.useState("");
  const [selectedLIndex, setSelectedLIndex] = React.useState(new IndexPath(0));
  const [selectedPIndex, setSelectedPIndex] = React.useState(new IndexPath(0));
  const displayLValue = Ldata[selectedLIndex.row];
  const displayPValue = Pdata[selectedPIndex.row];
  const [model, setModel] = React.useState("");
  const [size, setSize] = React.useState("0");
  const [make, setMake] = React.useState("");

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
 
  const updateEditable = () =>{
    setIsEditable (!isEditable)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <SafeAreaView>
      <Image 
      style = {styles.Logo}
      source = {require('./extra/Logo.png')} />
      </SafeAreaView>
      <Text
          style={[styles.bottomSpace, styles.TextBox]}
          category='s1'
        >
          RIDER DETAILS
        </Text>
        <Text
          style = {styles.subtitleBox}
          category='s1'
        >
          Nickname
        </Text>
      <Input
          style={styles.bottomSpace}
          placeholder='Nickname'
          value={username}
          onChangeText={setUsername}
          disabled = {isEditable}
        />
       
       <Text
          style = {styles.subtitleBox}
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
          disabled = {isEditable}
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
          style = {styles.subtitleBox}
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
          disabled = {isEditable}
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
        style = {styles.subtitleBox}
          category='s1'
        >
          Make
        </Text>
        <Input
          style={styles.bottomSpace}
          placeholder='Make'
          value={make}
          onChangeText={setMake}
          disabled = {isEditable}
        />

        <Text
          style = {styles.subtitleBox}
          category='s1'
        >
          Model
        </Text>
        <Input
          style={styles.bottomSpace}
          placeholder='Model'
          value={model}
          onChangeText={setModel}
          disabled = {isEditable}

        />

        <Text
          style = {styles.subtitleBox}
          category='s1'
        >
          Size
        </Text>
        <Input
          style={styles.bottomSpace}
          placeholder='Size'
          value={size}
          onChangeText={(text) => checkSize(text)}
          disabled = {isEditable}

        />
        <Button
        style={{
          backgroundColor: isEditable ? 'blue': 'green',
          marginHorizontal: 24,
          marginTop: 24,
          }}
        onPress = {updateEditable}
       size = 'giant'
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
          status = 'danger'      
          appearance = 'ghost'
          size = 'giant'
        >
        Log Out
        </Button>
    </ScrollView>
  );
};

export default UserProfile

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  // EditButton: {
  //   color: isEditable ? 'Blue': 'red',
  //   marginHorizontal: 24,
  //   marginTop: 24,
  // },
});
