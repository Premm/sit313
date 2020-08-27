const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const appRouter = require("./routes")(app);

app.use("/", appRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
