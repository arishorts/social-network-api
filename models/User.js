const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { thoughtSchema } = require("./Thought");

userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [thoughtSchema],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

function validateUser(user) {
  const schema = {
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  };

  return Joi.validate(user, schema);
}

const User = model("user", userSchema);

exports.User = User;
exports.validateUser = validateUser;
