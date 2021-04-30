import firebase from '@react-native-firebase/app'

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
    return Promise.resolve(true)
  } catch (e) {
    return Promise.reject(err)
  }
}