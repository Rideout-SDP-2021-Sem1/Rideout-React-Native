const { Router } = require('express')
const { Location } = require('../models/index')

const locationRoute = Router()

locationRoute.route("/location")
  .get(async (req, res) => {

  })
  .post(async (req, res) => {

  })

module.exports = {
  locationRoute
}