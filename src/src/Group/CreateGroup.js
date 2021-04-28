import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const GroupCreate = () => {
  const [groupname, setgroupname] = useState('');
  const [Location, setLocation] = useState('');
  const [Attendants, settAttendants] = useState('');
  const [Pace, setPace] = useState('');
  const [licenseLVL, setlicense] = useState('');
  const [Description, setDescription] = useState('');
};

function CreateGroup(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectRow}>
        <View style={styles.rect}>
          <View style={styles.groupNameStack}>
            <Text style={styles.groupName}>Group Name:</Text>
            <TextInput
              placeholder="GroupName"
              style={styles.groupnameinput}
              onChangeText={input => setgroupname}
              defaultValue="GroupName"></TextInput>
          </View>
          <View style={styles.locationStack}>
            <Text style={styles.location}>Location:</Text>
            <TextInput
              placeholder="Location"
              style={styles.locationinput}
              onChangeText={input => setLocation}
              defaultValue="Location"></TextInput>
          </View>
          <View style={styles.maxAttendantsStack}>
            <Text style={styles.maxAttendants}>Max Attendants:</Text>
            <TextInput
              placeholder="Attendants"
              style={styles.attendantsinput}
              onChangeText={input => settAttendants}
              defaultValue="Attendants"></TextInput>
          </View>
          <View style={styles.miniPreferredPaceStack}>
            <Text style={styles.miniPreferredPace}>Mini preferred pace:</Text>
            <TextInput
              placeholder="Pace"
              style={styles.paceinput}
              onChangeText={input => setPace}
              defaultValue="Pace"></TextInput>
          </View>
          <View style={styles.minimiumStack}>
            <Text style={styles.minimium}>Minimium license level:</Text>
            <TextInput
              placeholder="Level"
              style={styles.licenselvlinput}
              onChangeText={input => setlicense}
              defaultValue="license"></TextInput>
          </View>
          <Text style={styles.description}>Description:</Text>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}>
              <TextInput
                placeholder="Description"
                style={styles.Description}
                onChangeText={input => setDescription}
                defaultValue="Description"></TextInput>
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(' ')}
            style={styles.createbutton}>
            <Text style={styles.create}>CREATE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loremIpsum}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,254,254,1)',
    flexDirection: 'row',
  },
  rect: {
    width: 360,
    height: 623,
    backgroundColor: '#E6E6E6',
  },
  groupName: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 145,
    fontSize: 20,
  },
  groupnameinput: {
    top: 0,
    left: 126,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 26,
    width: 234,
    fontSize: 20,
  },
  groupNameStack: {
    width: 360,
    height: 31,
    marginTop: 13,
  },
  location: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 145,
    fontSize: 20,
  },
  locationinput: {
    top: 0,
    left: 93,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 26,
    width: 234,
    fontSize: 20,
  },
  locationStack: {
    width: 327,
    height: 31,
    marginTop: 38,
  },
  maxAttendants: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 159,
    fontSize: 20,
  },
  attendantsinput: {
    top: 0,
    left: 145,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 26,
    width: 113,
    fontSize: 20,
  },
  maxAttendantsStack: {
    width: 258,
    height: 31,
    marginTop: 35,
  },
  miniPreferredPace: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 184,
    fontSize: 20,
  },
  paceinput: {
    top: 2,
    left: 180,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 26,
    width: 113,
    fontSize: 20,
  },
  miniPreferredPaceStack: {
    width: 293,
    height: 31,
    marginTop: 33,
  },
  minimium: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 214,
    fontSize: 20,
  },
  licenselvlinput: {
    top: 0,
    left: 210,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 26,
    width: 113,
    fontSize: 20,
  },
  minimiumStack: {
    width: 323,
    height: 31,
    marginTop: 38,
  },
  Description: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 31,
    width: 116,
    fontSize: 20,
    marginTop: 22,
  },
  scrollArea: {
    width: 360,
    height: 179,
    backgroundColor: '#E6E6E6',
  },
  scrollArea_contentContainerStyle: {
    height: 538,
    width: 360,
  },
  descri: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 538,
    width: 360,
    textAlign: 'justify',
  },
  createbutton: {
    width: 147,
    height: 53,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 100,
    marginTop: 24,
    marginLeft: 106,
  },
  create: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 30,
    width: 107,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 12,
    marginLeft: 20,
  },
  loremIpsum: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 135,
    marginTop: 30,
  },
  rectRow: {
    height: 623,
    flexDirection: 'row',
    flex: 1,
    marginRight: -135,
    marginTop: 90,
  },
});

export default CreateGroup;
