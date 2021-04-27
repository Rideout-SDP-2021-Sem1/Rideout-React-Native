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
    index: true,
    required: true
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
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: String
    },
    size: {
      type: String,
      required: true
    },
    license_number: {
      type: String
    },
    test: {
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
  }
})

const User = rideOut.model("User", userSchema)

module.exports = {
  User
}