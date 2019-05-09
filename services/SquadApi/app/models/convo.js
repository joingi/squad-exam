const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConvoSchema = new Schema(
  {
    body: {
      type: Array,
      required: true
    },
    author: {
      type: String
    },
    to: {
      type: String
    }
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

const Convo = mongoose.model("Convo", ConvoSchema);

module.exports = Convo;
