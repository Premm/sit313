const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  expiryDate: String,
  requireExperience: Boolean,
  noOfWorkers: Number,
  tasks: [
    {
      type: { type: String },
      question: String,
      reward: String,
      options: [String],
      imageURI: String,
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
