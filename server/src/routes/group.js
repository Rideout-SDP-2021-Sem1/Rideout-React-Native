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
    const headerUid = req.header.uid

    try {
      const insertObj = {
        ...data,
        ownerUid: headerUid,
        usersUid: [],
        currentAttendant: 1
      }
      
      const insertResult = await (new Group(insertObj)).save()

      return res.status(200).json(insertResult["_id"])
    } catch (err) {
      console.error("POST greoup error", err)
      return res.status(500).json(err)
    }
  })

module.exports = {
  groupRoute
}