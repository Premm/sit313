const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: String,
});

module.exports = mongoose.model("Task", taskSchema);
