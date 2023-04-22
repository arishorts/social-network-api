const Joi = require("joi");
const { Schema, model } = require("mongoose");

reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    // type: mongoose.ObjectId,
    // default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => `this is the date : ${date}`,
  },
});

thoughtSchema = new Schema({
  thoughtText: {},
  createdAt: {},
  username: {},
  reactions: [reactionSchema],
});

function validateThought(thought) {
  const schema = {
    thoughtText: Joi.string().alphanum().min(1).max(300).required(),
  };

  return Joi.validate(thought, schema);
}

const Thought = model("thought", thoughtSchema);

exports.Thought = Thought;
exports.validateThought = validateThought;
exports.thoughtSchema = thoughtSchema;
