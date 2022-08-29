const express = require("express");
const {
  createTransaction,
  getTransaction,
//   updateComment,
//   deleteComment,
} = require("../controllers/transaction");
const router = express.Router();

router.route("/:groupId/Transaction").get(getTransaction);
router.route("/Transaction").post(createTransaction);
// router.route("/Comments").put(updateComment);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;