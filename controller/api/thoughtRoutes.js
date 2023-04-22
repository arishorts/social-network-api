const router = require("express").Router();
const { Thought, validateThought } = require("../../models");

// //retrieve users
// router.get("/", async (req, res) => {
//   //localhost:3001/api/thoughts/
//   try {
//     res.status(200).json({ message: "Success thoughts" });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
