import { Router, Request, Response } from 'express'
import db from '../models/index'

const userRoute = Router()

userRoute.route("/user")
  .get(async (req: Request, res: Response) => {
    const uid = req.headers.uid

    try {
      const result = await db.User.findOne({ uid: uid }).lean().exec()
      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json(err)
    }
  })

export {
  userRoute
}