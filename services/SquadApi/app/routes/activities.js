const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const eventSchema = require("../models/event");

var multer = require("multer");
var bodyParser = require("body-parser");
var path = require("path");
var mkdirp = require("mkdirp");
var fs = require("fs");
const sharp = require("sharp");
const passport = require("passport");
var config = require("../../config/index");

const auth = require("../helpers/auth-helper");
passport.authenticate("jwt", config.session);
router.get("/activities", (req, res) => {
  console.log("asdasdsad");
  eventSchema
    .find({})
    .populate("person")
    .then(record => {
      res.json(record);
      console.log("record");
    })
    .catch(err => {
      console.log("ERR MSG: ", err);
    });
});

router.get("/activities/:id", (req, res) => {
  eventSchema
    .findById({
      _id: req.params.id
    })
    .then(record => {
      console.log(record);
      res.json(record);
    })
    .catch(err => console.log(err));
});

// // GET TRAINERS USERS
router.get("/hopthjalfun/:id", (req, res) => {
  console.log("eg er test ", req.params.id);

  eventSchema
    .findOne({ _id: req.params.id })
    .populate("person")
    .then(response => {
      // console.log("trainers response", response);
      return res.json(response);
    })
    .catch(err => console.log(err));
});

// // GET TRAINERS USERS
router.get("/einkathjalfun/:id", (req, res) => {
  console.log("eg er test hja einka ", req.params.id);

  eventSchema
    .findOne({ _id: req.params.id })
    .populate("person")
    .then(response => {
      // console.log("trainers response", response);
      return res.json(response);
    })
    .catch(err => console.log(err));
});

module.exports = router;
