const express = require("express");
const router = express.Router();
var eventSchema = require("../models/event");
var userSchema = require("../models/user");
var mongoose = require("mongoose");
// Multer file upload setup
const multer = require("multer");
var config = require("../../config/index");

const sharp = require("sharp");
let fs2 = require("fs-extra");
const aws = require("aws-sdk");
const fs = require("fs");
var albumBucketName = "testing-disa";
var bucketRegion = "EU (London)";
var IdentityPoolId = "IDENTITY_POOL_ID";
var eventController = require("../controllers/eventController");
const passport = require("passport");
const { verifyToken } = require("../helpers/auth-helper");

aws.config.update({
  accessKeyId: process.env.AMAZON_ID,
  secretAccessKey: process.env.AMAZON_KEY
});

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    let type = req.params.type;
    // let path = `./uploads/`;
    let path = `./application/static/img`;
    fs2.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  }
});

const ImageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: ImageFilter
});

// // POST EDIT USER IMAGE
router.post(
  "/profill/image",
  upload.single("profileImage"),
  passport.authenticate("jwt", config.session),
  eventController.profill_image
);

// Routes --POST & --GET Events
// Routes
router.post(
  "/admin/event",
  upload.array("eventImages"),
  passport.authenticate("jwt", config.session),
  eventController.admin_event
);

router.get(
  "/event/admin",
  passport.authenticate("jwt", config.session),
  eventController.event_admin
);

router.get(
  "/event/admin/test",
  passport.authenticate("jwt", config.session),
  eventController.event_admin_test
);

router.get(
  "/event/edit/:id?",
  // passport.authenticate("jwt", config.session),
  eventController.event_edit
);

router.post(
  "/event/edit",
  upload.array("eventImages"),
  passport.authenticate("jwt", config.session),
  eventController.post_event_edit
);

router.post("/event/signup", eventController.event_signup);

// delete event
router.get(
  "/event/delete",
  passport.authenticate("jwt", config.session),
  eventController.event_delete
);

module.exports = router;
