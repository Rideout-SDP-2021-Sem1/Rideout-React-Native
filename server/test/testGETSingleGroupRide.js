const { server } = require("../src/index")
const request = require("supertest")
const expect = require("chai").expect

describe("Get a single group ride", () => {
  it("Get a single group ride with a valid id", (done) => {
    request(server)
      .get("/group-single?id=608ba0eda08893012c79af79")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err)
        }
        result = res.body
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify({
          "_id": "608ba0eda08893012c79af79",
          "usersUid": [],
          "ownerUid": "CEwWh5P5e8VQ868RjkB14xdfD263",
          "meetupLocation": {
            "latitude": "-37.157",
            "longitude": "175.5517"
          },
          "meetupTime": "2021-05-18T15:38:40.000Z",
          "maximumAttendant": 7,
          "currentAttendant": 2,
          "minimumPreferredPace": "Spirited",
          "minimumLicenseLevel": "Full",
          "title": "North Coromandel Loop",
          "description": "A fun ride in the Coromandel loop.",
          "createdAt": "2021-04-30T06:17:17.276Z",
          "updatedAt": "2021-04-30T06:17:17.276Z",
          "__v": 0
        }))
        return done()
      })
  })

  it("Get a single group ride with an invalid id", (done) => {
    request(server)
      .get("/group-single?id=608ba0eda08893012c79af80")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, (err, res) => {
        if (err) {
          return done(err)
        }
        result = res.body
        expect(result).to.be.equal("Invalid group ride id.")
        return done()
      })
  })

  it("Get a single group ride without passing in an id", (done) => {
    request(server)
      .get("/group-single")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, (err, res) => {
        if (err) {
          return done(err)
        }
        result = res.body
        expect(result).to.be.equal("Invalid group ride id.")
        return done()
      })
  })

  it("Get a single group ride with an invalid object id", (done) => {
    request(server)
      .get("/group-single?id=608ba0eda08893012c79af80babba")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, (err, res) => {
        if (err) {
          return done(err)
        }
        result = res.body
        expect(result).to.be.equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
        return done()
      })
  })
})