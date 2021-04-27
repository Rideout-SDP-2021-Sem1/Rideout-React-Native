import express from 'express'
import config from './config'
import morgan from 'morgan'
import { userRoute } from './routes'

const PORT = config.port || 5000

const app = express()
app.use(express.json())

if (config.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

app.use("", userRoute)

app.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})