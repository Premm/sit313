const express = require("express");
const db = require("../db");
const path = require("path");
const https = require("https");
const requester = require("../../Task4.1P/db/models/requester");

module.exports = (app) => {
  //make a connection to th database.
  db.config();

  const router = express.Router();

  //page routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/requesters/:userId", (req, res) => {
    console.log(req.params.userId);
    db.models.Requester.find({ _id: req.params.userId }).then((requester) => {
      res.send(requester);
    });
  });

  app.get("/registration/error", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-error.html"));
  });

  app.get("/registration/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-success.html"));
  });

  //send-welcome-email endpoint
  app.post("/send-welcome-email", (req, res) => {
    console.log("BODY: ", req.body);
    const apiKey = "e39210082af7570162f254343c51c057-us17";
    const url = "https://us17.api.mailchimp.com/3.0/lists/9626df1a47";
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: { FNAME: firstname, LNAME: lastname },
        },
      ],
    };

    const jsonData = JSON.stringify(data);
    const options = {
      method: "POST",
      auth: `matt:${apiKey}`,
    };

    const request = https.request(url, options, (response) => {
      response.on("data", (data) => {
        res.send(data);
      });
    });

    request.on("error", (err) => {
      res.send(err, 401);
    });

    request.write(jsonData);
    request.end();
  });
  // submitting the requester registration form.
  router.post("/registration", (req, res) => {
    const requester = new db.models.Requester({ ...req.body });
    requester
      .save()
      .then((response) => res.send(response))
      .catch((err) => {
        console.log(err);
        res.send(err, 401);
      });
  });
  return router;
};
