const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  expiryDate: String,
  requireExperience: Boolean,
  noOfWorkers: Number,
  tasks: [
    {
      type: String,
      question: String,
      reward: Number,
      options: [String],
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
