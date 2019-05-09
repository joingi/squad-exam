var userSchema = require("../models/user");
var config = require("../../config/index");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var eventSchema = require("../models/event");
var userSchema = require("../models/user");
var mongoose = require("mongoose");
const multer = require("multer");
var config = require("../../config/index");

const sharp = require("sharp");
let fs2 = require("fs-extra");
const aws = require("aws-sdk");
const fs = require("fs");
var albumBucketName = "testing-disa";
var bucketRegion = "EU (London)";
var IdentityPoolId = "IDENTITY_POOL_ID";
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
// Display list of all Authors.
exports.leidbeinendur_list = function(req, res) {
  userSchema
    .find({ trainer: true })
    .then(response => {
      // console.log("trainers response", response);
      return res.json(response);
    })
    .catch(err => console.log(err));
};

// delete event
exports.event_delete = (req, res) => {
  eventSchema
    .find({ _id: req.query.id })
    .remove()
    .exec()
    .then(response => {
      // console.log("hihi", response);
      return res.json({ response });
    })
    .catch(e => {
      return res.status(422).json({ e });
    });
  return;
};

exports.event_signup = (req, res) => {
  console.log("get event", req.body);
  var person = { id: req.body.personId };
  eventSchema
    .findOne({ _id: req.body.eventId })
    .then(response => {
      var blabla;

      for (var i = 0; i < response.participants.total.length; i++) {
        blabla = response.participants.total[i].id === req.body.personId;
      }
      console.log("hihi blabla", blabla);

      if (blabla === true) {
        return res.json("already signed");
      } else {
        var person2 = { id: req.body.personId };
        // console.log("asdasd eventId", req.body.eventId);
        // console.log("asdasd person2", person2);
        eventSchema
          .findOneAndUpdate(
            { _id: req.body.eventId },
            { $push: { "participants.total": person2 } },
            { upsert: true }
          )
          .then(response => {
            // console.log("hihi edit2", response);
            return res.json("already signed");
          })
          .catch(e => {
            return res.status(422).json({ e });
          });
      }
    })
    .catch(e => {
      return res.status(422).json({ e });
    });
};

exports.event_edit = (req, res) => {
  // console.log("get event", req.query);
  // console.log("get even 123123t", req.param);
  // console.log("get event", req.body);
  eventSchema
    .find({ _id: req.query.id })
    .exec()
    .then(response => {
      console.log("hihi edit", response);
      return res.json({ response });
    })
    .catch(e => {
      return res.status(422).json({ e });
    });
  return;
};

exports.post_event_edit = async (req, res) => {
  console.log("rererere", req.files.length);

  const s3 = new aws.S3();
  try {
    var reqImage = [];
    if (req.files.length > 0) {
      console.log("asd????");
      var reqImagePath = [];
      var buffer;
      var s3res;
      for (let i = 0; i < req.files.length; i++) {
        buffer = await sharp(req.files[i].path)
          .resize(300)
          .toBuffer();

        s3res = await s3
          .upload({
            Bucket: "testing-disa",
            Key: `${req.files[i].filename}`,
            Body: buffer,
            ACL: "public-read"
          })
          .promise();

        reqImage.push(s3res.Location);
        reqImagePath.push(req.files[i].path);
      }
    } else {
      console.log("reject");
      reqImage = req.body.eventImages;
    }

    // var queryOptions = { upsert: true };
    var update = {
      $set: {
        category: req.body.category,
        content: req.body.content,
        equipment: req.body.equipment,
        eventImages: reqImage,
        title: req.body.title,
        about: req.body.about,
        location: req.body.location,
        level: req.body.level,
        participants: {
          min: req.body.participants.min,
          max: req.body.participants.max,
          total: req.body.participants.total
        },
        price: req.body.price,
        singleEvent: req.body.singleEvent,
        dateTime: req.body.dateTime
      }
    };
    eventSchema
      .findOneAndUpdate({ _id: req.body.eventId }, update, queryOptions)
      .then(response => {
        console.log("hihi edit2", response);
        var test = reqImagePath;

        function deleteFiles(test, callback) {
          if (test.length == 0) callback();
          else {
            var f = test.pop();
            fs.unlink(f, function(err) {
              if (err) callback(err);
              else {
                console.log(f + " deleted.");
                deleteFiles(test, callback);
              }
            });
          }
        }

        deleteFiles(test, function(err) {
          if (err) {
            console.log("hola", err);
          } else {
            console.log("all files removed");
          }
        });
        return res.json(response);
      })
      .catch(e => {
        return res.status(422).json({ e });
      });
  } catch (e) {
    console.log("err", e);
    res.status(422).json({ e });
  }
};

exports.event_admin_test = (req, res) => {
  // console.log("test id in evneets", req.query[0]);
  eventSchema
    .find({ "participants.total": req.query[0] })
    .then(response => {
      console.log("hihi", response);

      return res.status(200).json(response);
    })
    .catch(e => {
      return res.status(422).json({ e });
    });
  return;
};

exports.event_admin = (req, res) => {
  console.log("HEYYY admin", req.user._id);
  eventSchema
    .find({ person: req.user._id })
    .exec()
    .then(response => {
      console.log("hihi", response);

      return res.status(200).json(response);
    })
    .catch(e => {
      return res.status(422).json({ e });
    });
  return;
};

// Routes --POST & --GET Events
// Routes
exports.admin_event = async (req, res, next) => {
  // if (!req) return res.sendStatus(400);
  // console.log("hola i req.body", req.body);
  // console.log("hola i req.files", req.files);
  // Loop throug image array
  const s3 = new aws.S3();
  try {
    var reqImage = [];
    var reqImagePath = [];
    var buffer;
    var s3res;
    for (let i = 0; i < req.files.length; i++) {
      buffer = await sharp(req.files[i].path)
        .resize(300)
        .toBuffer();

      s3res = await s3
        .upload({
          Bucket: "testing-disa",
          Key: `${req.files[i].filename}`,
          Body: buffer,
          ACL: "public-read"
        })
        .promise();

      reqImage.push(s3res.Location);
      reqImagePath.push(req.files[i].path);
    }
    // console.log("reqImage", reqImage);
    // console.log("reqImagePath", reqImagePath);

    const newEvent = new eventSchema({
      _id: new mongoose.Types.ObjectId(),
      activityType: req.body.activityType,
      person: mongoose.Types.ObjectId(req.body.person),
      title: req.body.title,
      about: req.body.about,
      category: req.body.category,
      content: req.body.content,
      location: req.body.location,
      level: req.body.level,
      equipment: req.body.equipment,
      eventImages: reqImage,
      participants: req.body.participants,
      dateTime: req.body.dateTime,
      singleEvent: req.body.singleEvent,
      price: req.body.price
    });

    newEvent
      .save()
      .then(result => {
        console.log("result to DB::::", result);
        var test = reqImagePath;

        function deleteFiles(test, callback) {
          if (test.length == 0) callback();
          else {
            var f = test.pop();
            fs.unlink(f, function(err) {
              if (err) callback(err);
              else {
                console.log(f + " deleted.");
                deleteFiles(test, callback);
              }
            });
          }
        }

        deleteFiles(test, function(err) {
          if (err) {
            console.log("hola", err);
          } else {
            console.log("all files removed");
          }
        });

        return res.json(result);
      })
      .catch(e => console.log(e));
  } catch (e) {
    console.log("err", e);
    res.status(422).json({ e });
  }
};

// // POST EDIT USER IMAGE
exports.profill_image = async (req, res) => {
  // console.log("res /profill/edit body ", req.body);
  // console.log("res /profill/edit file ", req.file);

  const s3 = new aws.S3();
  try {
    const buffer = await sharp(req.file.path)
      .resize(300)
      .toBuffer();
    // .toFile(`./static/${req.file.filename}`)

    const s3res = await s3
      .upload({
        Bucket: "testing-disa",
        Key: `${req.file.filename}`,
        Body: buffer,
        ACL: "public-read"
      })
      .promise();

    // console.log("img", s3res.Location);
    var imgLocation = s3res.Location.toString();
    // console.log("imgLocation", imgLocation);
    var queryOptions = { upsert: true, new: true, setDefaultsOnInsert: true };

    userSchema
      .findOneAndUpdate(
        { email: req.body.email },
        { $set: { image: s3res.Location.toString() } },
        queryOptions
      )
      .then(user => {
        fs.unlink(`${req.file.path}`, err => {
          if (err) throw err;
          res.json({ file: s3res.Location });
          console.log("successfully deleted /tmp/hello");
        });
      });
  } catch (e) {
    console.log("err", e);
    res.status(422).json({ e });
  }
};
