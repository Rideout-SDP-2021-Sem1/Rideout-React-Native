import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Layout } from '@ui-kitten/components'
import MainLayout from './MainLayout'
import { signOut } from '../helper/auth'
import { serverInstance } from '../instances'

const TestProfile = (props) => {
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
          username: "bob"
        }
      })
      console.log("result", result.data)
    } catch (err) {
      console.error("api call error", err)
    }
  }

  return (
    <>
      <MainLayout {...props}>
        <Layout style={styles.contianer} level="1">
          <Button onPress={() => handleSignOut()}>
            Sign Out
          </Button>
          <Button onPress={() => handleApiCall()}>
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

export default TestProfile