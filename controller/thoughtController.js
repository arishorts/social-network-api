const router = require("express").Router();
const { Thought, validateThought } = require("../models/Thought");
const { User } = require("../models/User");

module.exports = {
  //retrieve all thoughts
  async getThoughts(req, res) {
    //localhost:3001/api/thoughts/
    try {
      const thoughts = await Thought.find().sort("username").select("-__v");

      res.send(thoughts).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //retrieve a thought
  async getThought(req, res) {
    //localhost:3001/api/thoughts/:thoughtId
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.send(thought).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a thought
  async createThought(req, res) {
    //localhost:3001/api/thoughts
    try {
      const { error, value } = await validateThought(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const thought = await Thought.create(req.body);
      //the _id is not matching up for the created thought and what gets pushed to the user
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Post created, but found no user with that ID" });
      }

      res.json("Created the thought 🎉");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a thought
  async deleteThought(req, res) {
    //localhost:3001/api/thoughts/:thoughtId
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought)
        return res
          .status(404)
          .send("The thought with the given ID was not found.");

      let user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!thought)
        return res
          .status(404)
          .send("The thought with the given ID was not found.");

      res.send(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a thought
  async updateThought(req, res) {
    //localhost:3001/api/thoughts/:thoughtId
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $set: {
            thoughtText: req.body.thoughtText,
            username: req.body.username,
          },
        }
      );
      if (!thought)
        return res
          .status(404)
          .send("The thought with the given ID was not found.");
      const updatedThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      res.send(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a user's reaction to a thought
  async createReaction(req, res) {
    //localhost:3001/api/thoughts/:thoughtId/reactions"
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought)
        return res
          .status(404)
          .send("The thought with the given ID was not found.");

      newReaction = await Thought.findOne({ _id: req.params.thoughtId });
      res.send(newReaction).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove a user's reaction to a thought
  async removeReaction(req, res) {
    //localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId"
    try {
      const reaction = await Thought.findOne({
        _id: req.params.thoughtId,
        reactions: { $elemMatch: { reactionId: req.params.reactionId } },
      });

      if (!reaction) {
        return res
          .status(404)
          .send("The reaction with the given ID was not found.");
      }

      let thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought)
        return res
          .status(404)
          .send("The thought with the given ID was not found.");

      thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.send(thought).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
