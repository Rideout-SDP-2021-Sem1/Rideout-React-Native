const { rideOut } = require('../instances/mongoose')
const { Schema } = require('mongoose')

const locationSchema = new Schema({
  uid: {
    type: String,
    index: true,
    required: true
  },
  lastSeen: {
    latitude: String,
    longitude: String
  },
  hidden: {
    type: Schema.Types.Boolean,
    index: true
  }
})

const Location = rideOut.model("Location", locationSchema)

module.exports = {
  Location
}