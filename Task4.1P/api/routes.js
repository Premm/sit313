const express = require("express");
const db = require("../db");
var path = require("path");

module.exports = (app) => {
  //make a connection to th database.
  db.config();

  const router = express.Router();

  //page routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/registration/error", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-error.html"));
  });

  app.get("/registration/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-success.html"));
  });

  // submitting the requester registration form.
  router.post("/registration", (req, res) => {
    const requester = new db.models.Requester({ ...req.body });
    requester
      .save()
      .then(() => res.redirect("/registration/success"))
      .catch((err) => {
        console.log(err);
        res.redirect("/registration/error");
      });
  });
  return router;
};
