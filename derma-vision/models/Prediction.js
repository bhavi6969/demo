const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  uploadedImage: {
    type: String,
    required: true
  },

  diseaseName: {
    type: String,
    required: true
  },

  confidenceScore: {
    type: Number
  },

  severityLevel: {
    type: String
  },

  suggestions: {
    type: String
  },

  scanDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Prediction", predictionSchema);