var userSchema = require("../models/user");
var config = require("../../config/index");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const multer = require("multer");

const sharp = require("sharp");
let fs2 = require("fs-extra");
const aws = require("aws-sdk");
const fs = require("fs");
var albumBucketName = "testing-disa";
var bucketRegion = "EU (London)";
var IdentityPoolId = "IDENTITY_POOL_ID";
const eventSchema = require("../models/event");

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
  // console.log("asd");
  userSchema
    .find({ trainer: true })
    .then(response => {
      // console.log("trainers response", response);
      return res.json(response);
    })
    .catch(err => console.log(err));
};

// get profill
exports.profill = function(req, res) {
  console.log("verify HÆ", req.user);
  return res.json(req.user);
};
// get leiðbeinandi id
exports.leidbeinendur_id = function(req, res) {
  userSchema
    .findOne({ _id: req.params.id })
    .then(response => {
      eventSchema
        .find({ person: response._id })
        .populate("person")
        .then(res2 => {
          const userInfo = { events: res2, user: response };
          return res.json(userInfo);
        });
    })
    .catch(err => console.log(err));
};

// // POST EDIT USER
exports.profill_edit = (req, res) => {
  var queryOptions = { upsert: true };

  var update = {
    $set: {
      about: req.body.about,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      location: req.body.location,
      categories: req.body.categories,
      serialNo: req.body.serialNo,
      bankInfo: {
        som1: req.body.bankInfo.som1,
        som2: req.body.bankInfo.som2,
        som3: req.body.bankInfo.som3
      }
    }
  };

  userSchema
    .findOneAndUpdate({ email: req.body.email }, update, queryOptions)
    .then(data => {
      // console.log("-hvar er data", data);
      return res.json(data);
    });
};

// SIGN UP
exports.signup = async (req, res) => {
  console.log("asd sign up ", req.file);
  let errors = [];

  if (req.body.password.length < 4) {
    errors.push({ text: "password has to be 4 characters" });
  }

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

    userSchema.findOne({ email: req.body.email }).then(user => {
      if (user) {
        console.log("email taken");
        return;
      } else {
        // console.log("img", s3res.Location);
        var imgLocation = s3res.Location.toString();
        const newUser = new userSchema({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          location: req.body.location,
          trainer: req.body.trainer,
          image: s3res.Location.toString()
        });
        // generate salt password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const token = jwt.sign({ user }, config.secret);
                res.json({ success: true, message: "Token granted", token });
                console.log("user saved and password hashed");
                return;
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  } catch (e) {
    console.log("err", e);
    res.status(422).json({ e });
  }
};

// // POST LOGOUT
exports.logout = function(req, res, next) {
  req.logout();
  res.json("you are logged out");
};

// // POST LOGIN
exports.login = function(req, res, next) {
  userSchema.findOne({ email: req.body.email }, (error, user) => {
    if (error || user === null) {
      // console.log("blaa", error);
      res.status(401).send({ message: "This is an error!" });
    } else {
      // console.log("blaa", user);
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          console.log("err wow", err);
          return res.status(401);
        }
        if (isMatch) {
          const token = jwt.sign({ user }, config.secret);
          res.json({
            success: true,
            message: "Token granted",
            token,
            user: user
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed."
          });
        }
      });
    }
  });
};
