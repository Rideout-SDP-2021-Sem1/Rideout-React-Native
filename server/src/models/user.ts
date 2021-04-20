import { rideOut } from '../instances/mongoose'
import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from '../interfaces'

const userSchemaFields: Record<keyof IUser, any> = {
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
}

const userSchema: Schema = new Schema(userSchemaFields)

interface IUserDocument extends IUser, Document {

}

const User = rideOut.model<IUserDocument>("User", userSchema)

export {
  User
}