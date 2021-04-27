import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
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

  const children = props.children || null

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainArea}>
          {children}
        </View>
        <View style={styles.bottomNavigationView}>
          <BottomNavigation style={styles.bottomNavigation} {...topState}>
            <BottomNavigationTab title='MAP' icon={MapIcon} />
            <BottomNavigationTab title='EVENT' icon={EventIcon} />
            <BottomNavigationTab title='PROFILE' icon={ProfileIcon} />
          </BottomNavigation>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainLayout

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  mainArea: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#27afe2"
  },
  bottomNavigationView: {
    display: "flex",
    justifyContent: "flex-end"
  }
});