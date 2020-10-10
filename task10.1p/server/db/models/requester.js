const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const requesterSchema = new mongoose.Schema({
  countryOfResidence: {
    type: String,
    trim: true,
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Your email is not valid!");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    validate(value) {
      if (value.length < 8) {
        throw new Error("Your password must be atleast 8 characters!");
      }
    },
  },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postcode: { type: String, trim: true },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (value.length && !validator.isMobilePhone(value)) {
        throw new Error("Your mobile phone number is not valid!");
      }
    },
  },
});

requesterSchema.pre("save", function (next) {
  const requester = this;
  if (!requester.isModified("password")) return next();
  bcrypt
    .hash(requester.password, 10)
    .then((hash) => {
      requester.password = hash;
      next();
    })
    .catch((err) => {
      return next(err);
    });
});

requesterSchema.methods.comparePassword = function (checkPassword) {
  return bcrypt.compare(checkPassword, this.password);
};

requesterSchema.plugin(findOrCreate);
requesterSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password",
});

module.exports = mongoose.model("Requester", requesterSchema);
