const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const { userRoute, locationRoute, groupRoute } = require('./routes')
const {
  checkFirebaseToken,
  swaggerSpecs,
  swaggerUi
} = require("./middleware")

const PORT = config.port || 5000

const app = express()
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("", checkFirebaseToken)

if (config.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

app.use(
  "",
  userRoute,
  locationRoute,
  groupRoute
)

app.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})

module.exports = {
  app
}