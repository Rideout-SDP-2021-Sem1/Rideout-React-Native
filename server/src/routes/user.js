const { Router } = require('express')
const { User } = require('../models/index')

const userRoute = Router()

userRoute.route("/user")
  .get(async (req, res) => {
    const headerUid = req.header.uid
    const uid = req.params.uid

    let uidSearchUp = ""
    const selfLookup = uid === undefined

    if (selfLookup) {
      // Uid query not passed in
      // Therefore, this is an user requesting 
      // for their own details
      uidSearchUp = headerUid
    } else {
      uidSearchUp = uid
    }

    try {
      const result = await User.findOne({ username: uidSearchUp }).lean().exec()
      if (result === null) {
        return res.status(200).json({})
      }
      const protectedResult = {
        nickname: result.nickname,
        license_level: result.license_level,
        preferred_pace: result.preferred_pace,
        make: result.bike_details[0].make,
        model: result.bike_details[0].model,
        size: result.bike_details[0].size,
      }
      return res.status(200).json(protectedResult)
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
  userRoute
}