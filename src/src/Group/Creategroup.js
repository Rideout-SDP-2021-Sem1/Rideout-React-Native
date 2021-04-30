import React, {useState, useContext} from 'react';
import {View, TouchableWithoutFeedback, Alert, ScrollView} from 'react-native';
import {
  IndexPath,
  Button,
  Input,
  Text,
  useStyleSheet,
  Select,
  SelectItem,
  TopNavigation,
} from '@ui-kitten/components';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const Creategroup = () => {
  const licenseList = ['Learners', 'Restricted', 'Full'];
  const PaceList = ['Relaxed', 'Mixed', 'Spirited'];
  const [groupname, setgroupname] = useState('');
  const [Location, setLocation] = useState('');
  const [displayDate, setDate] = useState('');
  const [Attendants, settAttendants] = useState('');
  const [selectedPace, setselectedPace] = useState(new IndexPath(0));
  const [selectedLicense, setSelectedLicense] = useState(new IndexPath(0));
  const displayLValue = licenseList[selectedPace.row];
  const displayPValue = PaceList[selectedPace.row];
  const [Description, setDescription] = useState('');

  const styles = useStyleSheet(themedStyles);

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <>
      <TopNavigation title="Create Group" accessoryLeft={renderBackAction} />
      <Divider />
      <View style={style.container}>
        <Scrollview style={StyleSheet.scrollcontainer} level="1">
          <Text category="s1">Group Name:</Text>
          <Input
            style={styles.bottemside}
            placeholder="group name"
            value={groupname}
            onChangeText={setgroupname}></Input>
          <Text category="s1">Location:</Text>
          <Input
            style={styles.bottemside}
            placeholder="Location"
            value={Location}
            onChangeText={setLocation}></Input>
          <Text category="s1">Max Attendants:</Text>
          <Input
            style={styles.bottemside}
            placeholder="Attendants"
            value={Attendants}
            onChangeText={settAttendants}></Input>
          <Text category="s1">Date</Text>
          <Datepicker
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            value={displayDate}
            Datepicked={datepicked}
          />
          <Text category="s1">Min preferred Pace:</Text>
          <Select
            style={styles.bottemside}
            placeholder="Select License Type"
            value={displayPValue}
            selectedIndex={selectedPace}
            onSelect={index => setselectedPace(index)}>
            {PaceList.map(pace => {
              return <SelectItem key={pace} title={pace} />;
            })}
          </Select>
          <Text category="s1">Minimium License:</Text>
          <Select
            style={styles.bottemside}
            placeholder="License Type"
            value={displayLValue}
            selectedIndex={selectedLicense}
            onSelect={index => setSelectedLicense(index)}>
            {licenseList.map(license => {
              return <SelectItem key={license} title={license} />;
            })}
          </Select>
          <Text category="s1">Description:</Text>
          <Input
            style={styles.bottemside}
            multiline={true}
            textStyle={{minHeight: 90}}
            placeholder="Description"
            {...multilineInputState}
            value={Description}
            onChangeText={setDescription}></Input>
          <Button
            style={[
              styles.createbutton,
              styles.bottomSpace,
              {
                marginBottom: 50,
              },
            ]}
            size="giant"
            onPress={'GroupPost'}>
            Create
          </Button>
        </Scrollview>
      </View>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  scrollcontainer: {
    background: 'white',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: 180,
  },
  bottemside: {
    marginBottom: 15,
  },
  createbutton: {
    marginVertical: 12,
    marginHorizontal: 16,
    marginBottom: 30,
  },
});
