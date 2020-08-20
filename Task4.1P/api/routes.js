const express = require("express");
const models = require("../db");
var path = require("path");

module.exports = (app) => {
  const router = express.Router();

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  router.post("/requester", (req, res) => {
    console.log("testing");
  });
  return router;
};
