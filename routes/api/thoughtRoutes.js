const router = require("express").Router();
const {
  getThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controller/thoughtController");

//retrieve all thoughts, create a thought
//localhost:3001/api/thoughts/
router.route("/").get(getThoughts).post(createThought);

//retrieve a thought, delete a thought, update a thought
//localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .delete(deleteThought)
  .put(updateThought);

//create a user's reaction to a thought
//localhost:3001/api/thoughts/:thoughtId/reactions"
router.route("/:thoughtId/reactions").post(createReaction);

//remove a user's reaction to a thought
//localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId"
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
