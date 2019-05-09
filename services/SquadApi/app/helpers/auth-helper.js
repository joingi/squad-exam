var jwt = require("jsonwebtoken");
var config = require("../../config/index");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// jwt = require("jsonwebtoken"),
// config = require("@config");
var userSchema = require("../models/user");
const verifyToken = {};

verifyToken.login = userSchema => (req, res) => {
  console.log("err", req.body);
  userSchema.findOne({ username: req.body.username }, (error, user) => {
    if (error) throw error;
    console.log("asjdkhaskjd", user);
    if (!user)
      res.status(401).send({
        success: false,
        message: "Authentication failed. User not found."
      });
    else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ user }, config.secret);
          res.json({
            success: true,
            message: "Token granted",
            token
            // trainer: user.trainer,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // location: user.location
          });
        } else {
          console.log("ekki passa");
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        }
      });
      // userSchema.comparePassword(req.body.password, (error, matches) => {
      //   if (matches && !error) {
      //     const token = jwt.sign({ user }, config.secret);
      //     res.json({
      //       success: true,
      //       message: "Token granted",
      //       token,
      //       user: user
      //     });
      //   } else {
      //     res.status(401).send({
      //       success: false,
      //       message: "Authentication failed. Wrong password."
      //     });
      //   }
      // });
    }
  });
};

verifyToken.verify = headers => {
  console.log("headers", headers);
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");

    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};
module.exports = verifyToken;
// module.exports = {
//   // Verify Token
//   verifyToken: function(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     // const bearerHeader = req.headers.authorization;
//     console.log("bearerHeader", req.headers);
//     console.log("bearerHeader res", res);

//     // Check if bearer is undefined
//     if (typeof bearerHeader !== "undefined") {
//       // Split at the space
//       const bearer = bearerHeader.split(" ");
//       // console.log("bearer", bearer);
//       // Get token from array
//       // console.log("brr length", bearer.length);
//       if (bearer.length > 1) {
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
//         console.log("bbbbb", req.token);
//         // Next middleware
//         next();
//       }
//       if (bearer.length < -1) {
//         const bearerToken = bearer[0];
//         // Set the token
//         req.token = bearerToken;
//         console.log("bbbbb", req.token);
//         // Next middleware
//         next();
//       }
//     } else {
//       // Forbidden
//       return res.sendStatus(403);
//     }
//   }
// };
