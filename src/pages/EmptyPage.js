import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Layout } from '@ui-kitten/components'
import MainLayout from './MainLayout'
import { signOut } from '../helper/auth'

const EmptyPage = (props) => {
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error("signout error", err)
    }
  }

  return (
    <>
      <MainLayout {...props}>
        <Layout style={styles.contianer} level="1">
          <Button onPress={() => handleSignOut()}>
            Some other test
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

export default EmptyPage