import auth from '@react-native-firebase/auth'

export const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return Promise.resolve(true)
  } catch (err) {
    return Promise.reject(err)
  }
}