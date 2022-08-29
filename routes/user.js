const express = require("express");
const {
  createUser,
  getUser,
   updateUser,
//   deleteComment,
} = require("../controllers/user");
const router = express.Router();

router.route("/:userEmailId/User").get(getUser);
router.route("/User").post(createUser);
router.route("/User").put(updateUser);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;