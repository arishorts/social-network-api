const router = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  removeFriend,
  createFriend,
} = require("../../controller/userController");

//retrieve all users, create a user
//localhost:3001/api/users/
router.route("/").get(getUsers).post(createUser);

//retrieve a user,delete a user, update a user
//localhost:3001/api/users/:id
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

//create a user's friends, remove a user's friends
//localhost:3001/api/users/:id/friends/:friendId"
router.route("/:id/friends/:friendId").post(createFriend).delete(removeFriend);

module.exports = router;
