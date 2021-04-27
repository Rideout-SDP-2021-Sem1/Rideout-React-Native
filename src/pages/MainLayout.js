import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const MapIcon = (props) => (
  <Icon {...props} name='map-outline' />
);

const EventIcon = (props) => (
  <Icon {...props} name='list-outline' />
);

const ProfileIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
}

const MainLayout = (props) => {
  console.log("props MainLayout\n", JSON.stringify(props, null, 4))
  const topState = useBottomNavigationState()

  return (
    <>
      <BottomNavigation style={styles.bottomNavigation} {...topState}>
        <BottomNavigationTab title='MAP' icon={MapIcon} />
        <BottomNavigationTab title='EVENT' icon={EventIcon} />
        <BottomNavigationTab title='PROFILE' icon={ProfileIcon} />
      </BottomNavigation>
    </>
  );
};

export default MainLayout

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});