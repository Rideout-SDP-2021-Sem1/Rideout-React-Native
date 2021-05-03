const { Router } = require('express')
const { Location, User } = require('../models/index')

const locationRoute = Router()

locationRoute.route("/location")
  .get(async (req, res) => {
    const headerUid = req.header.uid

    try {
      const doc = await Location.find({ hidden: false }).lean().exec()
      const promise = doc.map(async (c) => {
        try {
          // Lookup the user's information
          const userDoc = await User.findOne({ uid: c.uid }).lean().exec()
          if (userDoc === null) {
            return null
          }
          const userObj = {
            userId: c.uid,
            latitude: c.lastSeen.latitude,
            longitude: c.lastSeen.longitude,
            nickname: userDoc.nickname,
            pace: userDoc.preferred_pace,
            license: userDoc.license_level,
            make: userDoc.bike_details[0].make,
            model: userDoc.bike_details[0].model,
            size: userDoc.bike_details[0].size
          }
          return userObj
        } catch (err) {
          console.error("error in GET location user lookup", err)
          return null
        }
      })

      const finalDoc = await Promise.all(promise)
      const returnDoc = finalDoc.filter((c) => c !== null)
      return res.status(200).send(returnDoc)
    } catch (err) {
      console.error("GET location error", err)
      return res.status(500).json(err)
    }
  })
  .post(async (req, res) => {
    const headerUid = req.header.uid
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const hidden = req.body.hidden || false

    try {
      await Location.findOneAndUpdate({ uid: headerUid }, {
        lastSeen: {
          latitude: latitude,
          longitude: longitude,
        },
        hidden: hidden
      }, { upsert: true }).select("").lean().exec()
      return res.status(200).send("ok")
    } catch (err) {
      console.error("POST location error", err)
      return res.status(500).json(err)
    }
  })

module.exports = {
  locationRoute
}