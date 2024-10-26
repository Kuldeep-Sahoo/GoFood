const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  log: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: String,
  },
});
module.exports = mongoose.model("LogHist", UserSchema);
