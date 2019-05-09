const UserModel = require("../app/models/user");
// const LocalStrategy = require("passport-local").Strategy;
var userSchema = require("../app/models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const passport = require("passport");

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
var config = require("./index");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },

//     function(email, password, cb) {
//       console.log("email", email);
//       console.log("password", password);
//       return userSchema
//         .findOne({ email })
//         .then(user => {
//           if (!user) {
//             return cb(null, false, {
//               message: "Incorrect email or password."
//             });
//           }
//           console.log("hey", "user");
//           return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret
    },
    function(jwtPayload, cb) {
      console.log("jwtPayload123123", jwtPayload.user.email);
      //        return cb(null, jwtPayload);
      //find the user in db if needed
      return userSchema
        .findOne({ email: jwtPayload.user.email })
        .then(user => {
          // console.log("jwt user callHÆÆ", user);
          return cb(null, user);
        })
        .catch(err => {
          // console.log("jwt user errHÆÆÆ", err);
          return cb(err);
        });
    }
  )
);

// the serialize function determents which data of the user is stored in a session
passport.serializeUser(function(user, done) {
  console.log("user123123", "user");
  done(null, user.id);
  //saved to session req.session.passport.user = {id:'..'}
});

passport.deserializeUser(function(id, done) {
  // console.log("idtest123123", id);

  userSchema.findById(id, function(err, user) {
    console.log("idtest yser", "user");
    done(err, user);
  });
});
// };
