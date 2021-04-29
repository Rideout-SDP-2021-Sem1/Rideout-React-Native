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
      console.error("GET user error", err)
      return res.status(500).json(err)
    }
  })
  .post(async (req, res) => {
    const data = req.body.data

    try {
      const newUser = await User.findOneAndUpdate({
        uid: data.uid,
      }, {
        uid: data.uid,
        nickname: data.nickname,
        email: data.email,
        bike_details: data.bike_details,
        license_level: data.license_level,
        preferred_pace: data.preferred_pace
      }, { upsert: true, new: true }).select("").lean().exec()

      return res.status(200).json(newUser["_id"])
    } catch (err) {
      console.error("POST user error", err)
      return res.status(500).json(err)
    }
  })

module.exports = {
  userRoute
}