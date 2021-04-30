import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  IndexPath,
  StyleService,
  useStyleSheet,
  TopNavigation,
} from '@ui-kitten/components';
import CreateGroup from './Creategroup';
export const GroupPosts = props => {
  const licenseList = ['Learners', 'Restricted', 'Full'];
  const PaceList = ['Relaxed', 'Mixed', 'Spirited'];

  const [isEditable, setIsEditable] = useState(true);
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

  const updateEditable = () => {
    setIsEditable(!isEditable);
  };
  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;
  return (
    <>
      <TopNavigation title={groupname} accessoryLeft={renderBackAction} />
      <ScrollView>
        <Scrollview styles={styles.scrollcontainer} level="1">
          <p category="s1">{Location}:</p>
          <p category="s1">{displayDate}:</p>
          <p category="s1">Attendants:{Attendants}:</p>
          <p category="s1">Pace: {selectedPace}:</p>
          <p category="s1">License requirment:{selectedLicense}:</p>
          <p category="s1">Description{Description}:</p>
        </Scrollview>
      </ScrollView>
    </>
  );
};
const themedStyles = StyleService.create({
  card: {
    flex: 1,
    margin: 2,
  },
  scrollcontainer: {
    background: 'white',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: 180,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
