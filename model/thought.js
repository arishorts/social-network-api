const Joi = require("joi");
const mongoose = require("mongoose");

thoughtSchema = new mongoose.Schema({});

const Thought = mongoose.model("thought", thoughtSchema);

function validateThought(thought) {
  const schema = {};

  return Joi.validate(thought, schema);
}

module.exports = { Thought, validateThought };
