const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createComment, deleteComment } = require("../controllers/commentController");


router.post("/:id/comments", auth, createComment);
router.delete("/comments/:commentId", auth, deleteComment);

module.exports = router;