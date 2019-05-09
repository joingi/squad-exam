const mongoose = require("mongoose");
const { Schema } = mongoose;

// Address schema to nest inside eventSchema
const addressSchema = new Schema({
  street: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  postCode: {
    type: String,
    require: false
  }
});

// Participant Schema to nest inside eventSchema
const minMaxSchema = new Schema({
  min: Number,
  max: Number
});

// Event Schema
const eventSchema = new Schema({
  _id: mongoose.Schema.ObjectId,
  activityType: {
    type: Boolean
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  category: {
    type: Array,
    required: false
  },
  // Innihald viðburðs
  content: {
    type: Array,
    required: false
  },
  location: Object,
  date: {
    type: String
  },
  timeOfEvent: {
    type: String
  },
  timeLength: {
    type: String
  },
  level: {
    type: String,
    required: false
  },
  equipment: {
    type: Array,
    required: false
  },
  eventImages: {
    type: Array,
    required: false
  },
  // videoLink: {
  //   type: String,
  //   required: false
  // },
  participants: {
    type: Object
  },
  price: {
    type: Number,
    required: false
  },
  singleEvent: {
    type: Object
  },
  dateTime: {
    type: Object
  }
});

var newEvent = mongoose.model("Event", eventSchema);

module.exports = newEvent;
