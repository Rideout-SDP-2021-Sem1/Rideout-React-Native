const express = require('express')
const http = require("http")
const config = require('./config')
const morgan = require('morgan')
const { userRoute, locationRoute, groupRoute } = require('./routes')
const {
  checkFirebaseToken
} = require("./middleware")
const cors = require("cors")
const socketIo = require("socket.io")
const { onConnection } = require("./socket-io")

const PORT = config.port || 5000

const app = express()
app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  optionsSuccessStatus: 204
}))
app.use(express.json())
app.use("", checkFirebaseToken)

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
onConnection(io)

if (config.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

app.use(
  "",
  userRoute,
  locationRoute,
  groupRoute
)

server.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})

module.exports = {
  server
}