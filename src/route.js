const express = require("express");
const route = express.Router();

const { sendMail } = require("../src/Gmail")

route.post("/email", sendMail)

module.exports = route