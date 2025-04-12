const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  username: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  report: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
