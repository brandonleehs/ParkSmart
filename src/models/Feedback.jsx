const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
