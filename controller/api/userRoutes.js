const router = require("express").Router();
const { User, validateUser } = require("../../model/user");

//retrieve users
router.get("/", async (req, res) => {
  //localhost:3001/api/users/
  try {
    res.status(200).json({ message: "Success users" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
