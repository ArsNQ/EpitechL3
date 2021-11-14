const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  link: String,
  creator: String,
  isoDate: Date,
  origin: String,
  enable: Boolean,
});

module.exports = mongoose.model("Article", schema);
