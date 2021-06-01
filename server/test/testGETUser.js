const { server } = require("../src/index")
const request = require("supertest")
const expect = require("chai").expect

describe("Our application", () => {
  it("test math", () => {
    expect(5).to.be.equal(5)
    expect(5).to.not.be.equal(3)
  })

  it("test math 2", () => {
    expect(5).to.be.equal(5)
    expect(5).to.not.be.equal(3)
  })
})

describe("User endpoint", () => {
  it("Get user details of testUid", (done) => {
    request(server)
      .get("/user?uid=testUid")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err)
        }
        result = res.body
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify({
          "license_level": "Full",
          "preferred_pace": "Mixed",
          "make": "Tesla",
          "model": "Model 3",
          "size": "N/A"
        }))
        return done()
      })
  })
})