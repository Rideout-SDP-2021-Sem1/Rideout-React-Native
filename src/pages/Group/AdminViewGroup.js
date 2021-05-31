import React, { useState, useEffect } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, Icon, List, ListItem, Divider
} from '@ui-kitten/components';
import { auth } from '../../helper'
import { serverInstance } from '../../instances'
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Dummy from './dummyData.json'

export const AdminViewGroup = ({ route, navigation }) => {
  const { Id } = route.params

  const styles = useStyleSheet(themedStyle);

  const renderBackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
  )

  const navigateToGroupRides = () => {
    navigation && navigation.navigate("List")
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.minimumPreferredPace}`}
      description={`${item.description}`}
    />
  );


  return (
    <>
      <ScrollView
        style={styles.container}
      // contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView
          style={styles.container}>
          <Layout>
            <Button
              style={{
                marginLeft: 0,
                width: 100,
              }}
              status='basic'
              appearance='ghost'
              accessoryLeft={renderBackIcon}
              onPress={() => navigateToGroupRides()}

            >
              Group Rides
          </Button>
            <Image
              style={styles.Logo}
              source={require('./../UserProfile/extra/Logo.png')}
            />
            <Text
              style={{ alignSelf: 'center' }}
              category='s1'>
              Group Ride
          </Text>
          </Layout>
          <Text
            style={{ alignSelf: 'center' }}
            category='h2'>
            {`${Dummy.title}`}
          </Text>
          <Text
            style={{ alignSelf: 'center', marginTop: 15 }}
            category='p2'>
            {`${Dummy.description}`}
          </Text>

          <List
            style={styles.container}
            data={Dummy}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
          
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
