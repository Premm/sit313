const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/ICrowdTaskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
