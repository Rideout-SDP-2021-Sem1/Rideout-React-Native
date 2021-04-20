import express from 'express'
import config from './config'
import { User } from './models/user'

const run = async () => {
  try {
    const newUser = new User({
      username: "bob",
      nickname: "Bob"
    })
    await newUser.save()
  } catch (err) {
    console.error("Document saving error", err)
  }
}

// run()

const PORT = config.port || 5000

const app = express()
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Rideout Server is running on port ${PORT}`)
})