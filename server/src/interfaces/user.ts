interface IUser {
  uid: string,
  username: String,
  nickname?: String,
  email: String,
  bike_details: {
    make: String,
    model: String,
    year?: String,
    size: String,
    license_number?: String,
  },
  license_level: "Learner" | "Restricted" | "Full",
  preferred_pace: "Relaxed" | "Restricted" | "Sprinted",
}

export {
  IUser
}