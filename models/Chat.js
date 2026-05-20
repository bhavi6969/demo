const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },

  message: {
    type: String
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Chat", chatSchema);