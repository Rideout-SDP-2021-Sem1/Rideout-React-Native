import auth from '@react-native-firebase/auth'

export const signIn = async (email, password) => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return {
      email: result.user.email
    }
  } catch (err) {
    throw new Error('Error signing in');
  }
}