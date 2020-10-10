const express = require("express");
const db = require("../db");
const path = require("path");
const https = require("https");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { nextTick } = require("process");

module.exports = (app) => {
  //make a connection to th database.
  db.config();

  const router = express.Router();

  //page routes
  router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../signup.html"));
  });

  // just redirect to login for now. no home page
  router.get("/", (req, res) => {
    res.redirect("/login");
  });

  router.get("/tasks", (req, res) => {
    if (req.isAuthenticated()) {
      res.sendFile(path.join(__dirname, "../reqtasks.html"));
    } else {
      res.redirect("/login");
    }
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
      const { password, ...rest } = req.body;
      db.models.Requester.register({ ...rest }, password, (err, requester) => {
        res.send(requester);
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
      db.models.Requester.deleteOne({ _id: req.params.userId }, (err) => {
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

  router.post(
    "/authenticate",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      res.send(true);
    }
  );

  // tasks
  app
    .route("/tasks")
    // Retrieve
    .get((req, res) => {
      db.models.Task.find((err, tasks) => {
        if (err) {
          return res.send(err);
        }
        res.json(tasks);
      });
    })
    //Add
    .post((req, res) => {
      console.log(req.body);
      const task = new db.models.Task(req.body);
      console.log(task);
      task
        .save()
        .then(() => {
          res.json("saved successfully!");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("failed to save!");
        });
    });

  app.route("/tasks/:taskId").delete((req, res) => {
    db.models.Task.deleteOne({ _id: req.params.taskId }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json("Task Deleted");
    });
  });
  router.get("/authenticate/google", passport.authenticate("google"));

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/tasks");
    }
  );

  router.get("/registration/error", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-error.html"));
  });

  router.get("/registration/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../registration-success.html"));
  });

  router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
  });

  //send-welcome-email endpoint
  router.post("/send-welcome-email", (req, res) => {
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

  //NOW HANDLED WITH /REQUESTER ROUTE
  // // submitting the requester registration form.
  // router.post("/registration", (req, res) => {
  //   const requester = new db.models.Requester({ ...req.body });
  //   requester
  //     .save()
  //     .then((response) => res.send(response))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(401).send(err);
  //     });
  // });

  // submitting the requester registration form.
  router.get("/forgot-password", (req, res) => {
    res.sendFile(path.join(__dirname, "../forgot-password.html"));
  });

  router.post("/send-email", async (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({ email: email }, "Deakin2020", { expiresIn: "1h" });

    const mailOpts = {
      from: "Matt Benton", // This is ignored by Gmail
      to: email,
      subject: "Reset Password - SIT313",
      text: `Here is the link required to reset your password. https://aqueous-cove-09140.herokuapp.com/reset-password?token=${token}`,
    };

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "deakinsit313@gmail.com", // generated ethereal user
        pass: "deakin2020", // generated ethereal password
      },
    });

    await transporter.sendMail(mailOpts, (error, response) => {
      if (error) {
        console.log("failed to send email", error);
      }
      res.send(true);
    });
  });

  router.get("/reset-password", (req, res) => {
    const { token } = req.query;
    console.log(token);
    jwt.verify(token, "Deakin2020", function (err, decoded) {
      if (err) {
        res.redirect("/login");
      } else {
        res.sendFile(path.join(__dirname, "../reset-password.html"));
      }
    });
  });

  router.post("/set-password", (req, res) => {
    const { token, password } = req.body;
    jwt.verify(token, "Deakin2020", function (err, decoded) {
      if (err) {
        throw new Error("Could not decode the token.");
      } else {
        db.models.Requester.findOne({
          email: decoded.email,
        }).then((requester) => {
          console.log(requester);
          requester.setPassword(password, function () {
            requester.save().then(function () {
              console.log(requester);
              res.send(true);
            });
          });
        });
      }
    });
  });

  return router;
};
