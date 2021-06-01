const { User, Group } = require("../../models")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const handleRideOperation = async (socket, uid) => {
  socket.on("startGroupRide", async (data) => {
    console.log("data", data)
    const { groupId } = data

    // Get current group's details
    const groupDetails = await Group.findOne({ _id: new ObjectId(groupId) }).lean().exec()

    const listOfUsers = groupDetails.usersUid || []

    // Notify each user ID of this group ride starting
    const promiseSocket = listOfUsers.map(async (currentUser) => {
      await socket.to(currentUser).emit("startGroupRideResponse", {
        groupDetails
      })
    })

    await Promise.all(promiseSocket)

    // Send request to 
    // socket.emit("requestClientRide", {
    //   userDetails
    // })
  })
}

module.exports = {
  handleRideOperation
}