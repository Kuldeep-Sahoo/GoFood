const mongoose = require("mongoose");
const { Schema } = mongoose;
const Feedback = new Schema({
  email: {
    type: String,
  },
  rating: {
    type: String,
  },
  message: {
    type: String,
  },
});
module.exports = mongoose.model("feedback", Feedback);
