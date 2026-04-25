
const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();

const { sendBirthdayWishes } = require("../controllers/gmailController")
route.post("/email", upload.single("attachments"), sendBirthdayWishes)

module.exports = route
