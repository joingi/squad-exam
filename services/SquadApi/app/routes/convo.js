const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
var config = require("../../config/index");

const UserModel = require("../models/user");
const ConvoModel = require("../models/user");
const ConvoController = require("../controllers/convo");

router.post(
  "/chat",
  passport.authenticate("jwt", config.session),
  ConvoController.new_conversation
);
router.get(
  "/chat",
  passport.authenticate("jwt", config.session),
  ConvoController.get_conversation
);
router.get(
  "/chatList",
  passport.authenticate("jwt", config.session),
  ConvoController.list_conversation
);
router.post(
  "/chat/room",
  passport.authenticate("jwt", config.session),
  ConvoController.create_room
);

module.exports = router;
