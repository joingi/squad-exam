const passport = require("passport");
var config = require("../../config/index");
const bcrypt = require("bcryptjs");
var userSchema = require("../models/user");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var userController = require("../controllers/userController");
const verifyToken = require("../helpers/auth-helper");

// Multer file upload setup
const multer = require("multer");
var config = require("../../config/index");
// const path = require("path");
const sharp = require("sharp");
let fs2 = require("fs-extra");
const aws = require("aws-sdk");
const fs = require("fs");
var albumBucketName = "testing-disa";
var bucketRegion = "EU (London)";
var IdentityPoolId = "IDENTITY_POOL_ID";
var eventController = require("../controllers/eventController");

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

// // POST LOGIN
router.post("/login", userController.login);

// // POST LOGOUT
router.get("/logout", userController.logout);

// SIGN UP
router.post("/signup", upload.single("profileImage"), userController.signup);
// // GET USER
router.get(
  "/profill",
  passport.authenticate("jwt", config.session),
  userController.profill
);

// // GET TRAINERS USERS
router.get("/leidbeinendur", userController.leidbeinendur_list);

// // GET TRAINERS USERS
router.get("/leidbeinandi/:id", userController.leidbeinendur_id);

// // POST EDIT USER
router.post(
  "/profill/edit",
  passport.authenticate("jwt", config.session),
  userController.profill_edit
);

module.exports = router;
