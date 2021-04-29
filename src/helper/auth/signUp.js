import auth from '@react-native-firebase/auth'

export const signUp = async (email, password) => {
  try {
    const result = await auth().createUserWithEmailAndPassword(email, password);
    return {
      user: result.user
    }
  } catch (err) {
    throw new Error('Error signing in');
  }
}