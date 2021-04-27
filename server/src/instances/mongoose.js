const mongoose = require('mongoose')
const config = require('../config')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const rideOut = mongoose.createConnection(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
rideOut.once('open', function () {
  console.log("Rideout MongoDB database connection established successfully")
})

module.exports = {
  rideOut
}