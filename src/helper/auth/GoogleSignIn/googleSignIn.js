import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { serverInstance } from '../../../instances';

const googleSignIn = async () => {
  try {
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const result = await auth().signInWithCredential(googleCredential)
    const user = result.user

    const signUpPayload = {
      uid: user.uid,
      nickname: user.displayName,
      email: user.email,
      bike_details: {
        make: "",
        model: "",
        size: "0"
      },
      license_level: "",
      preferred_pace: ""
    }

    await serverInstance.post("/user", {
      data: signUpPayload
    })
    return Promise.resolve({
      email: result.user.email
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export {
  googleSignIn
}