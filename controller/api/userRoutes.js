const router = require("express").Router();
const { User, validateUser } = require("../../models");

//retrieve all users
router.get("/", async (req, res) => {
  //localhost:3001/api/users/
  try {
    const users = await User.find().sort("username");
    res.send(users).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//retrieve a user
router.get("/:id", async (req, res) => {
  //localhost:3001/api/users/:id
  try {
    const user = await User.findOne({ _id: req.params.id });

    !user
      ? res.status(404).json({ message: "No user with that ID" })
      : res.send(user).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a user
router.post("/", async (req, res) => {
  //localhost:3001/api/users
  try {
    //const { error } = validateUser(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    let user = await User.create(req.body);
    res.send(user).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
