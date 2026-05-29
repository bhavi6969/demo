const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "doctor", "admin"],
    default: "user"
  },

  phone: {
    type: String,
    default: ""
  },

  allergies: {
    type: String,
    default: ""
  },

  skinCondition: {
    type: String,
    default: ""
  },

  profileImage: {
    type: String
  },

  notifEmail: {
    type: Boolean,
    default: true
  },

  notifPush: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);