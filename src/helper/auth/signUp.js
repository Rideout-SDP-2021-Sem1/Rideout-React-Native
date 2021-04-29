import auth from '@react-native-firebase/auth'

export const signUp = async (email, password) => {
  try {
    const result = await auth().createUserWithEmailAndPassword(email, password);
    return Promise.resolve({
      user: result.user
    })
  } catch (err) {
    return Promise.reject(err)
  }
}