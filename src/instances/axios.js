import axios from 'axios'
import { firebase } from '@react-native-firebase/auth'

const serverInstance = axios.create({
  baseURL: "http://localhost:5000" || "https://rideout-nz.tk" || "http://139.59.120.86" || "http://191.168.1.3:5000"
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