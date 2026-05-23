const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getChatHistory,
  sendMessage,
  clearChatHistory
} = require("../controllers/chatController");

router.get("/history", protect, getChatHistory);
router.post("/message", protect, sendMessage);
router.delete("/history", protect, clearChatHistory);

module.exports = router;
