import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Layout, Input} from '@ui-kitten/components'
import MainLayout from './MainLayout'
import { signOut } from '../helper/auth'
// import { Input } from 'react-native-ui-kitten'
import react from 'react'
import { color } from 'react-native-reanimated'

const EmptyPage = (props) => {
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error("signout error", err)
    }
  }

  const [username, setUsername] = react.useState("");

  return (
    <>
      <MainLayout {...props}>
        <Layout style={styles.contianer} level="1">
          <Button 
          onPress={() => handleSignOut()}>
            Test
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