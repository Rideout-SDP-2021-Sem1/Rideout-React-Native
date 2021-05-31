const { handleRideRequest } = require("../utils")

const onConnection = (io) => {
  io.on("connection", socket => {
    const uid = socket.handshake.query.uid
    console.log("New client has been connected.", uid, socket.id)

    // Make this user join their own room
    socket.join(uid)
    console.log(socket.rooms)

    socket.emit("data", {
      test: "data'"
    })

    socket.on("info", (data) => {
      console.log("got info from client", data)
    })

    socket.on("disconnect", () => {
      console.log("Client has disconnected.", uid, socket.id)
    })
    
    // Setup handlers
    handleRideRequest(socket, uid)
  })
}

module.exports = {
  onConnection
}