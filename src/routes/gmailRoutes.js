const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();

const { sendMail } = require("../controllers/gmailController")

route.post("/email", upload.single("attachments"), sendMail)

module.exports = route