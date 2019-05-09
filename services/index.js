const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const consign = require("consign");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");

const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

require("./SquadApi/config/passport");
const jwt = require("jsonwebtoken");
const config = require("./SquadApi/config/index");
const database = require("./SquadApi/config/database")(mongoose, config);

// const { ensureAuthenticated } = require("../config/auth");

// Make upload folder route avalible
app.use("/uploads", express.static("../static/uploads"));

app.use(express.static("."));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Origin, Content-Type, access_token"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.set("secret", config.secret);

const User = require("./SquadApi/app/routes/user");
const Events = require("./SquadApi/app/routes/event");
const Activities = require("./SquadApi/app/routes/activities");
const Convo = require("./SquadApi/app/routes/convo");

app.use("/", User);
app.use("/", Events);
app.use("/", Activities);

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Websocket
let io = socket(server, { path: "/chat/socket.io" });

// // Websocket starts
io.on("connection", socket => {
  console.log("io.sockets.adapter.rooms", io.sockets.adapter.rooms);
  // Create conversation
  socket.on("join", data => {
    console.log("ROOM:::", data);
    socket.join(data.room);
    socket.on("chat-message", function(data) {
      // console.log("chatchat", data);
      var data2 = data;

      socket.emit("message", data2);
    });
  });

  //////CLOSER ///
});
// /* setup socket.io */
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", Convo);
