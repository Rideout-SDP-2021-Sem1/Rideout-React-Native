const { admin } = require("../utils/firebase-admin")
const db = require("../models")

// middleware to check that the given token is correct
const checkFirebaseToken = async (req, res, next) => {
  const _firebaseToken = req.headers["auth-token"]
  if (_firebaseToken == null) {
    return res.status(401).send("Unauthorized.")
  }

  let tokenData
  try {
    tokenData = await admin.auth().verifyIdToken(_firebaseToken)
    const uid = tokenData.uid || ""

    req.header["uid"] = uid

    const userData = await db.User.findOne({ uid: uid }).lean().exec()
    let role = ""
    if (userData !== null) {
      role = userData.role || "user"
    }
    req.header["role"] = role

    return next()
  } catch (err) {
    return res.status(401).json({ status: "error", error: err })
  }
}

module.exports = {
  checkFirebaseToken
}