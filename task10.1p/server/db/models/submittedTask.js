const mongoose = require("mongoose");

const submittedTaskSchema = new mongoose.Schema({
  userId: String,
  taskId: String,
  questions: [
    {
      questionId: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("SubmittedTask", submittedTaskSchema);
