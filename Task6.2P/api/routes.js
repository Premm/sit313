const express = require("express");
const db = require("../db");
const path = require("path");
const https = require("https");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  //make a connection to th database.
  db.config();

  const router = express.Router();

  //page routes
  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../signup.html"));
  });

  // just redirect to login for now. no home page
  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  app.get("/tasks", (req, res) => {
    res.sendFile(path.join(__dirname, "../reqtasks.html"));
  });

  // added this so i could get the user data, to re send the email (try and subscribe to mailchimp again if it failed).
  app.get("/requesters/:userId", (req, res) => {
    console.log(req.params.userId);
    db.models.Requester.find({ _id: req.params.userId }).then((requester) => {
      res.send(requester);
    });
  });

  app.post("/authenticate", (req, res) => {
    db.models.Requester.findOne({ email: req.body.email })
      .then((requester) => {
        if (!requester) {
          res.send(false);
        }
        return requester
          .comparePassword(req.body.password)
          .then((isMatch) => res.send(isMatch))
          .catch((err) => {
            console.log("error comparing passwords: ", err);
            throw new Error("Could not authenticate.");
          });
      })
      .catch((err) => {
        console.log("error comparing passwords: ", err);
        throw new Error("Could not authenticate.");
      });
  });

  app.get("/registration/error", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-error.html"));
  });

  app.get("/registration/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-success.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
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
        res.status(401).send(err);
      });
  });
  return router;
};
