const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Add the username field
  text: { type: String, required: true }, // Text of the comment
  date: { type: Date, default: Date.now }, // Date of the comment
  deleted: { type: Boolean, default: false }, // Flag to mark the comment as deleted
});

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Base64 image string field
  comments: [commentSchema], // Add the comments array
  deleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);