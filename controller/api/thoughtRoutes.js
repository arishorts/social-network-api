const router = require("express").Router();
const { Thought, validateThought } = require("../../models/Thought");

//retrieve all thoughts
router.get("/", async (req, res) => {
  //localhost:3001/api/thoughts/
  try {
    const thoughts = await Thought.find().sort("username");
    res.send(thoughts).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//retrieve a thought
router.get("/:thoughtId", async (req, res) => {
  //localhost:3001/api/thoughts/:thoughtId
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    !thought
      ? res.status(404).json({ message: "No thought with that ID" })
      : res.send(thought).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a thought
router.post("/", async (req, res) => {
  //localhost:3001/api/thoughts
  try {
    const { error, value } = await validateThought(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let thought = await Thought.create(value);
    res.send(thought).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a thought
router.delete("/:thoughtId", async (req, res) => {
  //localhost:3001/api/thoughts/:thoughtId
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!thought)
      return res
        .status(404)
        .send("The thought with the given ID was not found.");
    res.send(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a thought
router.put("/:thoughtId", async (req, res) => {
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
    const updatedThought = await Thought.findOne({ _id: req.params.thoughtId });
    res.send(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a user's reaction to a thought
router.post("/:thoughtId/reactions", async (req, res) => {
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
});

//remove a user's reaction to a thought
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
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
});

module.exports = router;
