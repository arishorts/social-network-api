const router = require("express").Router();
const { User, validateUser } = require("../models/User");
const { Thought } = require("../models/Thought");

module.exports = {
  //retrieve all users
  async getUsers(req, res) {
    //localhost:3001/api/users/
    try {
      const users = await User.find().select("-__v");

      res.send(users).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //retrieve a user
  async getUser(req, res) {
    //localhost:3001/api/users/:id
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a user
  async createUser(req, res) {
    //localhost:3001/api/users
    try {
      const { error, value } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.create(req.body);
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a user
  //BONUS: Remove a user's associated thoughts when deleted.
  async deleteUser(req, res) {
    //localhost:3001/api/users/:id
    try {
      const user = await User.findOneAndRemove({ _id: req.params.id });
      if (!user)
        return res
          .status(404)
          .send("The user with the given ID was not found.");

      await Thought.deleteMany({ username: user.username });

      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    //localhost:3001/api/users/:id
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { username: req.body.username, email: req.body.email } }
      );
      if (!user)
        return res
          .status(404)
          .send("The user with the given ID was not found.");
      const updatedUser = await User.findOne({ _id: req.params.id });
      res.send(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a user's friends
  async createFriend(req, res) {
    //localhost:3001/api/users/:id/friends/:friendId"
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend)
        return res
          .status(404)
          .send("The friend with the given user ID was not found.");

      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user)
        return res
          .status(404)
          .send("The user with the given ID was not found.");

      user = await User.findOne({ _id: req.params.id });
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove a user's friends
  async removeFriend(req, res) {
    //localhost:3001/api/users/:id/friends/:friendId"
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend)
        return res
          .status(404)
          .send("The friend with the given user ID was not found.");

      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user)
        return res
          .status(404)
          .send("The user with the given ID was not found.");

      user = await User.findOne({ _id: req.params.id });
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
