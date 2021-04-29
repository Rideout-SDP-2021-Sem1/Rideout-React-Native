import React, { useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { NavigationContext } from '../context'

const MapIcon = (props) => (
  <Icon {...props} name='map-outline' />
);

const EventIcon = (props) => (
  <Icon {...props} name='list-outline' />
);

const ProfileIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const MainLayout = (props) => {
  const { index, setIndex } = useContext(NavigationContext)
  const navigation = props.navigation

  const handleNavigateToPage = (pageName) => {
    navigation && navigation.push(pageName);
  }

  const handleSelectChange = (index) => {
    setIndex(index)
    switch (index) {
      case 0:
        // Navigate to map screen
        handleNavigateToPage("Map")
        break
      case 1:
        // Navigate to list screen
        handleNavigateToPage("List")
        break
      case 2:
        handleNavigateToPage("Profile")
        break;
      default:
        break
    }
  }

  const children = props.children || null

  return (
    <>
      <View style={styles.safeArea}>
        <View style={styles.mainArea}>
          {children}
        </View>
        <SafeAreaView style={styles.bottomNavigationSafeAreaView}>
          <BottomNavigation
            style={styles.bottomNavigation}
            selectedIndex={index}
            onSelect={(index) => handleSelectChange(index)}
          >
            <BottomNavigationTab title='MAP' icon={MapIcon} />
            <BottomNavigationTab title='EVENT' icon={EventIcon} />
            <BottomNavigationTab title='PROFILE' icon={ProfileIcon} />
          </BottomNavigation>
        </SafeAreaView>
      </View>
    </>
  );
};

export default MainLayout

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  mainArea: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white" || "#27afe2"
  },
  bottomNavigationView: {
    display: "flex",
    justifyContent: "flex-end"
  }
});