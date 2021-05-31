const { User } = require("../../models")

const handleRideRequest = async (socket, uid) => {
  socket.on("requestServerRide", async (data) => {
    console.log("data", data)
    const { userId } = data

    // Get current user's details
    const userDetails = await User.findOne({ uid: userId }).lean().exec()

    // Send request to 
    socket.to(userId).emit("requestClientRide", {
      userDetails
    })
  })
}

module.exports = {
  handleRideRequest
}