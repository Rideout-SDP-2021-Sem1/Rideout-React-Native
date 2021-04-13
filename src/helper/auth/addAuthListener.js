import firebase from '@react-native-firebase/app'

export const addAuthListener = (callback) => {
  const onChange = (user) => {
    if (user) {
      // is signed in
      callback({});
    } else {
      // is signed out or not signed in
      callback(null);
    }
  }

  return firebase.auth().onAuthStateChanged(onChange);
}