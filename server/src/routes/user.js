const { Router } = require('express')
const { User } = require('../models/index')

const userRoute = Router()

userRoute.route("/user")
  .get(async (req, res) => {
    const uid = String(req.headers.uid)
    const username = String(req.query.username)

    try {
      const result = await User.findOne({ username: username }).lean().exec()
      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  .post(async (req, res) => {
    const data = req.body.data

    try {
      const newUser = new User({
        uid: data.uid,
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        bike_details: data.bike_details,
        license_level: data.license_level,
        preferred_pace: data.preferred_pace
      })
      const saveData = await newUser.save()

      return res.status(200).json(saveData["_id"])
    } catch (err) {
      return res.status(500).json(err)
    }
  })

module.exports = {
  userRoute
}