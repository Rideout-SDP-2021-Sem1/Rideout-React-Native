import auth from '@react-native-firebase/auth'

export const signIn = async (email, password) => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return Promise.resolve({
      email: result.user.email
    })
  } catch (err) {
    return Promise.reject(err)
  }
}