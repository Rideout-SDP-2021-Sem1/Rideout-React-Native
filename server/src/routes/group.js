const { Router } = require('express')
const { Group } = require('../models/index')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const groupRoute = Router()

groupRoute.route("/group")
  /**
   * Returns a list of groups
   */
  .get(async (req, res) => {
    try {
      const result = await Group.find().lean().exec()
      return res.status(200).json(result)
    } catch (err) {
      console.error("GET group error", err)
      return res.status(500).json(err)
    }
  })
  /**
   * Add a new group ride
   */
  .post(async (req, res) => {
    const data = req.body.data
    const headerUid = req.header.uid

    try {
      const insertObj = {
        ...data,
        ownerUid: headerUid,
        usersUid: [headerUid],
        currentAttendant: 1
      }
      const insertResult = await (new Group(insertObj)).save()

      return res.status(200).json(insertResult["_id"])
    } catch (err) {
      console.error("POST greoup error", err)
      return res.status(500).json(err)
    }
  })

groupRoute.route("/group-single")
  /**
   * Get a single group ride's details
   */
  .get(async (req, res) => {
    const { id } = req.query

    if (id === undefined) {
      return res.status(400).json("Invalid group ride id.")
    }

    try {
      const doc = await Group.findOne({ _id: new ObjectId(id) }).lean().exec()

      if (doc === null) {
        return res.status(400).json("Invalid group ride id.")
      }
      return res.status(200).json(doc)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })
  /**
   * Join a single group
   */
  .post(async (req, res) => {
    const { id } = req.query
    const { uid: currentUserUid } = req.header

    try {
      const doc = await Group.findOne({ _id: new ObjectId(id) }).lean().exec()

      if (doc === null) {
        return res.status(400).json("Invalid group ride id.")
      }

      // Check if maximum number of people is exceeded
      if (doc.currentAttendant >= doc.maximumAttendant) {
        return res.status(400).json("This group ride is full.")
      }

      // Check if the user is already in the group ride
      if (doc.usersUid.includes(currentUserUid)) {
        return res.status(400).json("You have already joined this group ride.")
      }

      // Add the user to the group ride
      const newDoc = await Group.findOneAndUpdate({ _id: new ObjectId(id) }, {
        $push: {
          usersUid: currentUserUid
        },
        $inc: {
          currentAttendant: 1
        }
      }, { new: true }).lean().exec()

      return res.status(200).json(newDoc)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })

module.exports = {
  groupRoute
}