const mongoose = require("mongoose");
const validator = require("validator");

const requesterSchema = new mongoose.Schema({
  countryOfResidence: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Your email is not valid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 8) {
        throw new Error("Your password must be atleast 8 characters!");
      }
    },
  },
  passwordConfirmation: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (this.password !== value) {
        throw new Error("Your passwords do not match!");
      }
    },
  },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postCode: { type: String, trim: true },
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

module.exports = mongoose.model("Requester", requesterSchema);
