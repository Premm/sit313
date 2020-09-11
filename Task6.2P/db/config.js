const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/iCrowdTaskDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() =>
      console.log("Connected to mongodb://localhost:27017/iCrowdTaskDB")
    )
    .catch(() =>
      console.log("Failed to connect to mongodb://localhost:27017/iCrowdTaskDB")
    );
};
