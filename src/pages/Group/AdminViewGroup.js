import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, Icon, List, ListItem, Divider
} from '@ui-kitten/components';
import { serverInstance } from '../../instances'
import dummy from './dummyData.json'
import { SocketContext } from '../../context'

export const AdminViewGroup = ({ route, navigation }) => {
  const [groupId, setGroupId] = useState(route.params.Id)

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
        console.log("result", response.data)
      } catch (err) {
        console.error("error AdminViewGroup", err)
      } finally {
        socketObj.setLoading(false)
      }
    }
    getData()
  }, [route])

  const styles = useStyleSheet(themedStyle);

  const renderBackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
  )

  const navigateToGroupRides = () => {
    navigation && navigation.navigate("List")
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.nickname}`}
      description={`${item.description}`}
    />
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
          <Text
            style={{ alignSelf: 'center' }}
            category='h2'>
            {`${dummy.title}`}
          </Text>
          <Text
            style={{ alignSelf: 'center', marginTop: 15 }}
            category='p2'>
            {`${dummy.description}`}
          </Text>

          <List
            style={styles.container}
            data={dummy.users}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
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
