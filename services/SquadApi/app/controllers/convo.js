const ConvoModel = require("../models/convo");
var userSchema = require("../models/user");

exports.create_room = (req, res, next) => {
  console.log("asdasdlkasjdlk", req.query);
  const conversation = new ConvoModel({
    author: req.query.author,
    to: req.query.to
  });

  ConvoModel.find({
    $or: [
      {
        $and: [
          {
            author: req.query.author
          },
          {
            to: req.query.to
          }
        ]
      },
      {
        $and: [
          {
            author: req.query.to
          },
          {
            to: req.query.author
          }
        ]
      }
    ]
  }).exec(function(err, convoNew) {
    console.log("convoNew", convoNew);
    conversation
      .save()
      .then(response => {
        console.log("resres", response);
        return req.io.sockets.to(response._id).emit("chat-message");
      })
      .catch(err => {
        return console.log("err create room", err);
      });
  });
};

exports.list_conversation = function(req, res) {
  console.log("logged in user i123d ", req.query);
  console.log("logged in user id ", req.user._id);
  var test = [];
  var test2 = [];
  ConvoModel.find({ $or: [{ author: req.user._id }, { to: req.user._id }] })
    .select("to author")
    .then(messages => {
      // console.log("mess ->", messages);

      messages.forEach(async user => {
        console.log("foreach", user.to);
        await test.push(user.to, user.author);
      });
      console.log("test", test);
      userSchema.find({ _id: test }).then(userList => {
        console.log("e", userList);
        return res.json(userList);
      });
      console.log("idk", test2);
    })
    .catch(err => console.log("err", err));
};

exports.get_conversation = (req, res, next) => {
  console.log("hahahaha", req.query);
  console.log("hahahaha body", req.user._id);
  var autherId = req.user._id;
  ConvoModel.findOne({
    $or: [
      { $and: [{ author: req.query.author }, { to: req.query.to }] },
      { $and: [{ author: req.query.to }, { to: req.query.author }] }
    ]
  }).exec(function(err, messages) {
    console.log("mess", messages);
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ conversation: messages });
  });
};

exports.new_conversation = function(req, res, next) {
  //   console.log("er þeta nytt???", req.io.sockets);
  console.log("asdasdlkasjdlk", req.user);
  console.log("asdasdlkasjdlk", req.body);
  if (req.body.body.user !== undefined) {
    const conversation = new ConvoModel({
      body: {
        user: req.body.body.user,
        msg: req.body.body.msg,
        createdAt: new Date()
      },
      author: req.body.author,
      to: req.body.to
    });

    ConvoModel.find({
      $or: [
        { $and: [{ author: req.body.author }, { to: req.body.to }] },
        { $and: [{ author: req.body.to }, { to: req.body.author }] }
      ]
    }).exec(function(err, convoNew) {
      // console.log("convoNew", convoNew.body);
      // console.log("convoNew...", convoNew[0]);
      //   console.log("convoNew", convoNew[0]._id);
      if (convoNew[0].length <= 0) {
        conversation
          .save()
          .then(response => {
            console.log("resres HÆ", response);

            return req.io.sockets
              .to(data)
              .emit("chat-message", "jsadlkjaslkdjlksa");
          })
          .catch(err => {
            return console.log("err conve", err);
          });
      } else {
        var test;
        var roomId;
        ConvoModel.findByIdAndUpdate(
          { _id: convoNew[0]._id },
          {
            $push: {
              body: {
                user: req.body.body.user,
                msg: req.body.body.msg,
                createdAt: new Date()
              }
            }
          },
          { new: true }
        )
          .sort({ createdAt: -1 })
          .exec(function(err, post) {
            last = function(array, n) {
              if (array == null) return void 0;
              if (n == null) return array[array.length - 1];
              console.log("am i empty", array.length);
              return array.slice(Math.max(array.length - n, 0));
            };

            var test = last(post.body);
            roomId = post._id;
            // newData = { userData: test, roomId: post._id };
            res.json(post);
            console.log("reeessss", roomId);
            return req.io.in(roomId).emit("chat-message", test);
          });
      }
    });
  } else {
    return console.log("please log in to send a message");
  }
};
