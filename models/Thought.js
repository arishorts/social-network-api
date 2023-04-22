const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");

reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      // type: mongoose.ObjectId,
      default: () => new Types.ObjectId(),
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
  },
  { toJSON: { getters: true } }
);

thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: (date) => `this is the date: ${date}`,
  },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

//Schema Settings
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

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
