import axios from 'axios'
import { firebase } from '@react-native-firebase/auth'

const serverInstance = axios.create({
  baseURL: "http://191.168.1.3:5000"
})

serverInstance.interceptors.request.use(
  async (config) => {
    if (firebase.auth().currentUser != null) {
      const idTokenfinal = await firebase.auth().currentUser.getIdToken()
      console.log("idTokenfinal", idTokenfinal)
      config.headers["auth-token"] = idTokenfinal
    }
    return Promise.resolve(config)
  },
  function (error) {
    return Promise.reject(error);
  }
);

export {
  serverInstance
}