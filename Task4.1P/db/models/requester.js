const mongoose = require("mongoose");

const requesterSchema = new mongoose.Schema({
  countryOfResidence: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  passwordConfirmation: String,
  address: String,
  city: String,
  state: String,
  postCode: String,
  phone: String,
});

module.exports = mongoose.model("Requester", requesterSchema);
