import io from 'socket.io-client'
import { SERVER_URL } from '../utils'
import { firebase } from '@react-native-firebase/auth'

let socket = null

const getSocket = async () => {
  if (socket === null) {
    const socketConnection = io(SERVER_URL, {
      query: {
        uid: firebase.auth().currentUser?.uid ?? 'Unknown',
      },
    })
    socketConnection.on("connect", () => {
      console.log('socket id', socketConnection.id)
      console.log('socket is connected?', socketConnection.connected)
    })

    socket = socketConnection
  }

  return socket
}

export {
  getSocket
}