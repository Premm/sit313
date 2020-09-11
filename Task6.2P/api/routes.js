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

  // Requesters
  app
    .route("/requesters")
    // Retrieve
    .get((req, res) => {
      db.models.Requester.find((err, requesters) => {
        if (err) {
          return res.send(err);
        }
        res.send(requesters);
      });
    })
    //Add
    .post((req, res) => {
      const requester = new db.models.Requester({ ...req.body });
      requester
        .save()
        .then((response) => res.send(response))
        .catch((err) => {
          res.status(401).send(err);
        });
    })
    //Remove
    .delete((req, res) => {
      db.models.Requester.deleteMany((err) => {
        if (err) {
          return res.send(err);
        }
        res.send(true);
      });
    });

  // Single Requester
  app
    .route("/requesters/:userId")
    //Retrieve
    .get((req, res) => {
      console.log(req.params.userId);
      db.models.Requester.find({ _id: req.params.userId }).then((requester) => {
        res.send(requester);
      });
    })
    //Update
    .put((req, res) => {
      db.models.Requester.findOne({ _id: req.params.userId }).then(
        (requester) => {
          // get a combination of all the keys in both objects.
          const combinedObject = { ...req.body, ...requester.toJSON() };
          //loop through all the keys, if the key exists and isnt null in req.body,
          //set it to req.body, else set it to undefined (instead of null which would just ignore it.)
          Object.keys(combinedObject).forEach((key) => {
            if (key !== "_id")
              req.body[key]
                ? (requester[key] = req.body[key])
                : (requester[key] = undefined);
          });

          requester
            .save()
            .then(() => res.send(true))
            .catch(() => res.send(false));
        }
      );
    })
    //Remove
    .delete((req, res) => {
      db.models.Requester.delete({ _id: req.params.userId }, (err) => {
        if (err) {
          return res.send(err);
        }
        res.send(true);
      });
    })
    .patch((req, res) => {
      //used findOneAndUpdate because it returns the document that it updates.
      db.models.Requester.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { returnOriginal: false }
      )
        .then((requester) => {
          // then I'm saving it to make use of the mongoose document middleware to hash the password.
          // I have no idea if this is the best way to do it, but after hours of digging,
          // I couldnt find a single agreed upon method to do this.
          new db.models.Requester(requester)
            .save()
            .then(() => res.send(true))
            .catch(() => res.send(false));
        })
        .catch(() => res.send("failed to update"));
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
