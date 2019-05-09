const mongoose = require("mongoose");
const { Schema } = mongoose;

const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const messageSchema = new Schema({
  message: {
    type: String,
    required: false
  },
  room: {
    type: String,
    required: false
  },
  createdAt: { type: Date, default: Date.now }
})


const userSchema = new Schema({
  trainer: {
    type: Boolean,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  telephone: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: Number
  },
  location: {
    type: String,
    required: false
  },
  categories: [{}],
  serialNo: {
    type: Number,
    required: false
  },
  bankInfo: {
    som1: {
      type: Number
    },
    som2: {
      type: Number
    },
    som3: {
      type: Number
    }
  },

  messages: [messageSchema]
  // events: [eventSchema]
});
// Schema.pre("save", function(next) {
//   const user = this;
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, (error, salt) => {
//       if (error) return next(error);
//       bcrypt.hash(user.password, salt, (error, hash) => {
//         if (error) return next(error);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

// Schema.methods.comparePassword = function(password, callback) {
//   bcrypt.compare(password, this.password, (error, matches) => {
//     if (error) return callback(error);
//     callback(null, matches);
//   });
// };

// mongoose.model("User", Schema);

const User = mongoose.model("User", userSchema);

module.exports = User;
