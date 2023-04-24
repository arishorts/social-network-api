const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");
const dayjs = require("dayjs");

reactionSchema = new Schema(
  {
    reactionId: {
      //this is returning _id, id, and reactionsId.
      type: Schema.Types.ObjectId,
      // type: mongoose.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: dayjs(),
      get: (date) => dayjs(date).format("MMM D, YYYY HH:mm A"),
    },
  },
  {
    //i have no idea what this is doing
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: dayjs(),
      get: (date) => dayjs(date).format("MMM D, YYYY HH:mm A"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
    //	"__v": 0 what is this?
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//Schema Settings
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

function validateThought(thought) {
  const schema = Joi.object({
    thoughtText: Joi.string().min(1).max(300).required(),
    username: Joi.string().required(),
  });

  return schema.validate(thought);
}

const Thought = model("thought", thoughtSchema);

exports.Thought = Thought;
exports.validateThought = validateThought;
exports.thoughtSchema = thoughtSchema;
