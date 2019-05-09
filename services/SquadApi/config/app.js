// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const consign = require("consign");
// const cors = require("cors");

// const app = express();
// var server = require("http").createServer(app);
// var io = require("socket.io")(server).listen(3001);

// // Create HTTP server for socket.io
// // const server = http.createServer(app);

// const session = require("express-session");
// const passport = require("passport");

// require("./passport");
// const jwt = require("jsonwebtoken");
// const config = require("./index");
// const database = require("./database")(mongoose, config);

// // const { ensureAuthenticated } = require("../config/auth");

// // Make upload folder route avalible
// app.use("/uploads", express.static("../static/uploads"));

// app.use(express.static("."));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));
// app.use(cors());

// // Express session middleware
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );

// app.use("*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Accept, Origin, Content-Type, access_token"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// // passport middleware
// // app.use(passport.initialize());
// // app.use(passport.session());

// app.set("secret", config.secret);

// const User = require("../app/routes/user");
// const Events = require("../app/routes/event");
// const Activities = require("../app/routes/activities");
// const Messages = require("../app/routes/messages");
// const Room = require("../app/routes/rooms");

// app.use("/", User);
// app.use("/", Events);
// app.use("/", Activities);
// app.use("/", Messages);
// app.use("/", Room);

// module.exports = app;
