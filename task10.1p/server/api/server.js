const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const db = require("../db");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "695757388194-nkc0cd515eogduo12mdba34spl0beprg.apps.googleusercontent.com",
      clientSecret: "VfYSn7EcgrPP7sA5dLMG9cMQ",
      callbackURL: "/auth/google/callback",
      scope: "email",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      db.models.Requester.findOrCreate({ email: profile.email }, function (
        err,
        user
      ) {
        return done(err, user);
      });
    }
  )
);

passport.use(db.models.Requester.createStrategy());

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(
  session({
    secret: "Deakin2020",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

passport.serializeUser(db.models.Requester.serializeUser());

passport.deserializeUser(db.models.Requester.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

const appRouter = require("./routes")(app);

app.use("/", appRouter);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
