import mongoose from 'mongoose'
import config from '../config'
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const rideOut = mongoose.createConnection(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
rideOut.once('open', function () {
  console.log("Rideout MongoDB database connection established successfully")
})

export {
  rideOut
}