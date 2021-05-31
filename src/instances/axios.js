import axios from 'axios'
import { firebase } from '@react-native-firebase/auth'
import { SERVER_URL } from '../utils'

const serverInstance = axios.create({
  baseURL: SERVER_URL || "https://rideout-nz.tk"
})

serverInstance.interceptors.request.use(
  async (config) => {
    if (firebase.auth().currentUser != null) {
      const idTokenfinal = await firebase.auth().currentUser.getIdToken()
      config.headers["auth-token"] = idTokenfinal
    }
    return Promise.resolve(config)
  },
  function (error) {
    console.log("error intercept request axios", error)
    return Promise.reject(error)
  }
)

export {
  serverInstance
}