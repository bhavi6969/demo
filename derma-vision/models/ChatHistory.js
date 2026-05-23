const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "ai"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  showScanCta: {
    type: Boolean,
    default: false
  },
  isFollowUp: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  messages: [messageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
