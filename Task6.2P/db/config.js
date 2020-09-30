const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://admin-matt:Deakin2020@cluster0.gh01v.mongodb.net/iCloudTaskDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect to DB"));
};
