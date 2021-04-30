const { Router } = require('express')
const { Group } = require('../models/index')

const groupRoute = Router()

groupRoute.route("/group")
  .get(async (req, res) => {
    try {
      const result = await Group.find().lean().exec()
      return res.status(200).json(result)
    } catch (err) {
      console.error("GET group error", err)
      return res.status(500).json(err)
    }
  })
  .post(async (req, res) => {
    const data = req.body.data

    try {
      const check = await User.findOne({
        uid: data.uid
      }).select("").lean().exec()
      if (check !== null) {
        return res.status(200).send("ok")
      }
      const newUser = await User.findOneAndUpdate({
        uid: data.uid,
      }, {
        uid: data.uid,
        nickname: data.nickname,
        email: data.email,
        bike_details: data.bike_details,
        license_level: data.license_level,
        preferred_pace: data.preferred_pace,
        role: "user"
      }, { upsert: true, new: true }).select("").lean().exec()

      return res.status(200).json(newUser["_id"])
    } catch (err) {
      console.error("POST user error", err)
      return res.status(500).json(err)
    }
  })

module.exports = {
  groupRoute
}