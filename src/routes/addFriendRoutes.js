const express = require("express");
const route = express.Router();

const { addFriends } = require("../controllers/addFriendsController");

route.post("/create", addFriends);

module.exports = route;