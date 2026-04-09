const express = require("express");
const route = express.Router();

const { sendMail } = require("../controllers/gmailController")

route.post("/email", sendMail)

module.exports = route