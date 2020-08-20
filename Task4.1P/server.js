const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const appRouter = require("./api/routes")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", appRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
