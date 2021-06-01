const { rideOut } = require('../instances/mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
  uid: {
    type: String,
    index: true,
    required: true
  },
  username: {
    type: String,
    index: true
  },
  nickname: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true,
    required: true
  },
  bike_details: [{
    make: {
      type: String,
      index: true,
      required: true
    },
    model: {
      type: String,
      index: true,
      required: true
    },
    year: {
      type: String
    },
    size: {
      type: String,
      index: true,
      required: true
    },
    license_number: {
      type: String
    }
  }],
  license_level: {
    type: String,
    index: true,
    required: true
  },
  preferred_pace: {
    type: String,
    index: true,
    required: true
  },
  role: {
    type: String,
    index: true
  },
  isInActiveGroupRide: {
    type: Schema.Types.Boolean,
    index: true
  },
  activeGroupRideId: {
    type: Schema.Types.ObjectId,
    index: true
  }
})

const User = rideOut.model("User", userSchema)

module.exports = {
  User
}