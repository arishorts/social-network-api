const Joi = require("joi");
const mongoose = require("mongoose");

userSchema = new mongoose.Schema({});

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = {};

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
