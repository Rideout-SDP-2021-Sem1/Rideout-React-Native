const { rideOut } = require('../instances/mongoose')
const { Schema } = require('mongoose')

const groupSchema = new Schema({
  ownerUid: {
    type: String,
    index: true,
    required: true
  },
  usersUid: {
    type: Schema.Types.Array
  },
  meetupLocation: {
    latitude: String,
    longitude: String
  },
  meetupTime: {
    type: Schema.Types.Date
  },
  maximumAttendant: {
    type: Schema.Types.Number,
    index: true
  },
  currentAttendant: {
    type: Schema.Types.Number,
    index: true
  },
  minimumPreferredPace: {
    type: String,
    index: true
  },
  minimumLicenseLevel: {
    type: String,
    index: true
  },
  title: {
    type: String,
    index: true
  },
  description: {
    type: String
  }
}, { timestamps: true })

const Group = rideOut.model("Group", groupSchema)

module.exports = {
  Group
}