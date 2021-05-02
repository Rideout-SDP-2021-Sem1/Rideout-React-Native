const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rideout Server - API Endpoint Documentation",
      version: "0.1.0",
      description:
        "",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Bob",
        email: "bob.liou.engineer@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions)

module.exports = {
  swaggerUi,
  swaggerSpecs
}