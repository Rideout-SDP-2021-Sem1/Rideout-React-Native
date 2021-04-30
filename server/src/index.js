const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const { userRoute, locationRoute } = require('./routes')
const { checkFirebaseToken } = require("./middleware")

const PORT = config.port || 5000

const app = express()
app.use(express.json())
app.use("", checkFirebaseToken)

if (config.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

app.use(
  "",
  userRoute,
  locationRoute
)

app.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})