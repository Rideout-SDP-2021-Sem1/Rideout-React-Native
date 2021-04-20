import { rideOut } from '../instances/mongoose'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
    index: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    required: true
  },
  bike_details: {
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
    }
  },
  license_level: {
    type: String,
    index: true
  },
  preferred_pace: {
    type: String,
    index: true
  }
})

const User = rideOut.model("User", userSchema)

export {
  User
}