import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, Icon, List, ListItem, Divider
} from '@ui-kitten/components';
import { serverInstance } from '../../instances'
import { SocketContext } from '../../context'
import Geocoder from 'react-native-geocoding';

export const AdminViewGroup = ({ route, navigation }) => {

  Geocoder.init("AIzaSyCKX3VD9qQtp6esG1Xe52s3vT1DAm72Wpo");
  const [groupId, setGroupId] = useState(route.params.Id)
  const [eventObj, setEventObj] = useState({})

  const socketObj = useContext(SocketContext)

  useEffect(() => {
    const currentRouteGroupId = route.params.Id
    setGroupId(currentRouteGroupId)
    const getData = async () => {
      try {
        socketObj.setLoading(true)
        const response = await serverInstance.get("/group-single", {
          params: {
            id: currentRouteGroupId
          }
        })
        setEventObj(response.data)
        setLocation(response.data)
      } catch (err) {
        console.error("error AdminViewGroup", err)
      } finally {
        socketObj.setLoading(false)
      }
    }
    getData()
  }, [route])

  const styles = useStyleSheet(themedStyle);

  const [owner, setOwnwer] = useState(true)
  const [area, setArea] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const renderBackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
  )

  const navigateToGroupRides = () => {
    navigation && navigation.navigate("List")
  }

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <ListItem
        title={`${item.nickname}`}
        description={`${item.license}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
      />
    )
  };

  const setLocation = (eventObj) => {
    Geocoder.from(eventObj.meetupLocation.latitude, eventObj.meetupLocation.longitude)
      .then(json => {
        console.log("results json", json)
        const addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setArea(addressComponent)
      })
      .catch(error => console.warn(error));
  };

  const renderItemAccessory = (props) => (
    <Button
      size='tiny'
      status='danger'
    >
      Remove
    </Button>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='person' />
  );

  return (
    <>
      <View
        style={styles.container}
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
          <Divider
            style={{ marginTop: 10 }} />
          <Text
            style={{ alignSelf: 'center' }}
            category='h2'>
            {`${eventObj.title}`}
          </Text>
          <Text
            style={{ alignSelf: 'center', marginTop: 15 }}
            category='p2'>
            {`${eventObj.description}`}
          </Text>
          <Divider
            style={{ marginTop: 10 }} />
          <Text
            style={{ alignSelf: 'flex-start', marginTop: 15 }}
            category='s2'>
            Maximum Number of People: {`${eventObj.maximumAttendant}`}
          </Text>

          <Text
            style={{ alignSelf: 'flex-start', marginTop: 10 }}
            category='s2'>
            Current Attendants: {`${eventObj.currentAttendant}`}
          </Text>

          <Text
            style={{ alignSelf: 'flex-start', marginTop: 10 }}
            category='s2'>

            Meetup Location: {`${area}`}
          </Text>
          <Divider
            style={{ marginTop: 10 }} />

          <Text
            style={{ alignSelf: 'center', marginTop: 10 }}
            category='h6'>
            Riders
          </Text>
          <Divider
            style={{ marginTop: 10 }} />

          <List
            style={styles.container}
            data={eventObj.users}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
          <Button
            visable={isAdmin}
            style={{ marginTop: 50 }}
            size='giant'
            status='danger'
            appearance='outline'
          >
            Ban Ride
          </Button>
        </SafeAreaView>
      </View>
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
