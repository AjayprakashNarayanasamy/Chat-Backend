const express = require("express");

const {
  createDirectConversation,
} = require(
  "../controllers/conversationController"
);

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post(
  "/direct/:userId",
  authMiddleware,
  createDirectConversation
);

module.exports = router;