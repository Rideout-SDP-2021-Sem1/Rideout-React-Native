import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Layout, Modal,Card, Text } from '@ui-kitten/components'
import MainLayout from './MainLayout'
import { signOut } from '../helper/auth'
import { serverInstance } from '../instances'
import { RideRequestPopup} from './PopUps/PopUps'
// import { useState } from 'react/cjs/react.production.min'
import { Size } from '@ui-kitten/components/devsupport'

const PopUps = (props, {navigation})  => {

  const [name,setName] = useState('');
  const [bike, setBike] = useState('');
  const [License, setLicense] = useState('');
  const [Preferred, setPreffered] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error("signout error", err)
    }
  }

  const handleApiCall = async () => {
    try {
      const result = await serverInstance.get("/user", {
        params: {
          uid: "9MSUi01BEvcyP4QiljVM0Mq2Wer1"
        }
      })
      console.log("result", result.data)
      setName(result.data.nickname)
      setBike(`${result.data.make} ${result.data.model}`)
      setLicense(result.data.license_level)
      setPreffered(result.data.preferred_pace)
    } catch (err) {
      console.error("api call error", err)
    }
  }

  useEffect(() => {
    handleApiCall()
  }, [])

  return (
    <>
      {/* <Modal
        visible={React.useState(true)}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        // onBackdropPress={() => setShowModal(false)}
      >
        
      </Modal> */}
      <Modal
        visible={React.useState(true)}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        // onBackdropPress={() => setShowModal(false)}
      >
        <Layout
          level="1"
          style={{
            alignItems: "center",
            display: "flex",
            alignContent: 'center'
          }}
        >
          <Card
            style={{
              // alignItems: "center",
              display: "flex",
              alignContent: 'stretch',
              width: 300
            }}
          >
            <Text
              category="h6"
              style= {{
                alignContent: 'flex-end'
              }}
            >
              {/* {`${currentEventDetails?.title}`} */}
              {`${name} wants to RIDE`} 
            </Text>
            <Text
              category="p1"
            >
              {/* {`${currentEventDetails?.description}`} */}
              {bike}
            </Text>
            <Text
              category="p1"
            >
              {/* {`Current Attendant: ${currentEventDetails?.currentAttendant}`} */}
              {License}
            </Text>
            <Text
              category="p1"
            >
              {/* {`Maximum Attendant: ${currentEventDetails?.maximumAttendant}`} */}
              {Preferred}
            </Text>
           <Layout>
             <Button
             style = {{
             backgroundColor: '#27afe2',
             }}>
               Accept
             </Button>
             <Button
             style = {{
              marginTop: 10,
            //  backgroundColor: 'red',
             }}
             status='danger'
             appearance='outline'
             >
               Decline
             </Button>
             </Layout>
          </Card>
        </Layout>
      </Modal>
      <MainLayout {...props}>
        
        <Layout style={styles.contianer} level="1">
          {/* <Button onPress={() => handleSignOut()}>
            Sign Out
          </Button> */}
          <Button 
          // onPress={}
          >
            Test Call
          </Button>
        </Layout>
      </MainLayout>
    </>
  )
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default PopUps