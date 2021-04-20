import express from 'express'
import config from './config'

const PORT = config.port || 5000

const app = express()
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})