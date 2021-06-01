import React, { createContext, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Modal, Card, Text, Spinner } from '@ui-kitten/components'
import { getSocket } from '../../utils'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {

  const [openRequestModal, setOpenRequestModal] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [socketReady, setSocketReady] = useState(false)
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSocketEvent = (socketInstance) => {
    socketInstance.on("requestClientRide", (data) => {
      console.log("data", data)
      const { userDetails } = data
      setUserDetails(userDetails)
      setOpenRequestModal(true)
    })
  }

  useEffect(() => {
    const getSocketConnection = async () => {
      try {
        const socketConnection = await getSocket()
        setSocket(socketConnection)
        setSocketReady(true)
        handleSocketEvent(socketConnection)
      } catch (err) {
        console.error("error getSocketConnection", err)
      }
    }
    getSocketConnection()
  }, [])

  const handleRideRequestResponse = () => {
    setOpenRequestModal(false)
  }

  const contextValue = {
    socket,
    socketReady,
    loading,
    setLoading
  }

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
      <Modal
        visible={loading}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        <Spinner size="giant" />
      </Modal>
      <Modal
        visible={openRequestModal}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
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
              style={{
                alignContent: 'flex-end'
              }}
            >
              {/* {`${currentEventDetails?.title}`} */}
              {`${userDetails?.nickname} wants to RIDE`}
            </Text>
            <Text
              category="p1"
            >
              {`${userDetails?.bike_details?.make ?? ""} ${userDetails?.bike_details?.model ?? ""} ${userDetails?.bike_details?.size ?? ""} `}
            </Text>
            <Text
              category="p1"
            >
              {userDetails?.license_level ?? ""}
            </Text>
            <Text
              category="p1"
            >
              {userDetails?.preferred_pace ?? ""}
            </Text>
            <Layout>
              <Button
                style={{
                  backgroundColor: '#27afe2',
                }}
                onPress={() => handleRideRequestResponse(false)}>
                Accept
             </Button>
              <Button
                style={{
                  marginTop: 10,
                }}
                status='danger'
                appearance='outline'
                onPress={() => handleRideRequestResponse(false)}
              >
                Decline
             </Button>
            </Layout>
          </Card>
        </Layout>
      </Modal>
    </SocketContext.Provider>
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

export {
  SocketContext,
  SocketProvider
}