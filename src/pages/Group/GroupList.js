import React, { useState, useEffect } from 'react';
import { ScrollView, Image, SafeAreaView, View, Alert } from 'react-native';
import {
  IndexPath, Button, StyleService, useStyleSheet, Input, Select,
  SelectItem, Text, Layout, Modal, Card, Spinner, List, ListItem,
  Icon
} from '@ui-kitten/components';
import { auth } from '../../helper'
import { serverInstance } from '../../instances'

const GroupList = (props) => {
  const [waiting, setWaiting] = useState(false)
  const [groupList, setGroupList] = useState([])

  const styles = useStyleSheet(themedStyle)

  const renderItemAccessory = (props) => (
    <Button size='tiny'>View</Button>
  )

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

  return (
    <>
      <Modal
        visible={waiting}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        <Spinner size="giant" />
      </Modal>
      {/* <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      > */}
      <Layout
        level="1"
        style={styles.container}
      >
        <List
          data={groupList}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.title}
                description={item.description}
                accessoryLeft={renderItemIcon}
                accessoryRight={renderItemAccessory}
              />
            )
          }}
        />
      </Layout>
      {/* </ScrollView> */}
    </>
  );
};

export default GroupList

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
