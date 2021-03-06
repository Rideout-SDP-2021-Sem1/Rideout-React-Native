import React, { useState, useEffect } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, List, ListItem,
  Icon
} from '@ui-kitten/components';
import { auth } from '../../helper'
import { serverInstance } from '../../instances'
import moment from 'moment'
import FAB from 'react-native-fab'

const GroupList = (props) => {
  const navigation = props.navigation
  const [showModal, setShowModal] = useState(false)
  const [groupList, setGroupList] = useState([])
  const [currentEventDetails, setCurrentEventDetails] = useState({})

  const styles = useStyleSheet(themedStyle)

  const renderItemAccessory = (details) => {
    return (
      <Button
      size='tiny'
      style={{
        backgroundColor: '#27afe2',
        borderColor: '#27afe2'
      }}
        onPress={() => {
          setShowModal(true)
          setCurrentEventDetails(details)
        }}
      >
        View
      </Button>
    )
  }

  const renderItemIcon = (props) => (
    <Icon {...props} name='calendar-outline' />
  )

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverInstance.get("/group")
        const data = response.data

        setGroupList(data)
      } catch (err) {
        console.error("failed to get group list", err)
      }
    }
    getData()
  }, [])

  const navigateToCreateGroupPage = () => {
    navigation && navigation.navigate("CreateEvent")
  }

  return (
    <>
      <Modal
        visible={showModal}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        onBackdropPress={() => setShowModal(false)}
      >
        <Layout
          level="1"
          style={{
            alignItems: "center",
            display: "flex",
            alignContent: 'center',
          }}
        >
          <Card
            style={{
              alignItems: "center",
              display: "flex",
              alignContent: 'center',
            }}
          >
            <Text
              category="h6"
            >
              {`${currentEventDetails?.title}`}
            </Text>
            <Text
              category="p1"
            >
              {`${currentEventDetails?.description}`}
            </Text>
            <Text
              category="p1"
            >
              {`Current Attendant: ${currentEventDetails?.currentAttendant}`}
            </Text>
            <Text
              category="p1"
            >
              {`Maximum Attendant: ${currentEventDetails?.maximumAttendant}`}
            </Text>
            <Text
              category="p1"
            >
              {`Meetup Time: ${moment(currentEventDetails?.meetupTime).toString() || moment().toString()}`}
            </Text>
          </Card>
        </Layout>
      </Modal>
      <SafeAreaView>
      <Layout
        level="1"
        style={styles.container}
      >
        <List
        style = {{
          height: '100%',
          backgroundColor: 'white'
        }}
          data={groupList}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.title}
                description={item.description}
                accessoryLeft={renderItemIcon}
                accessoryRight={() => renderItemAccessory(item)}
              />
            )
          }}
        />
      </Layout>
      <FAB buttonColor="blue" iconTextColor="#FFFFFF" onClickAction={() => { navigateToCreateGroupPage() }} visible={true} />
      </SafeAreaView>
    </>
  );
};

export default GroupList

const themedStyle = StyleService.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white'
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
