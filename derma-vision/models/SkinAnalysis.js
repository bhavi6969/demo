const mongoose = require("mongoose");

const skinAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  scanId: {
    type: String,
    default: ""
  },
  diseaseId: {
    type: String,
    default: ""
  },
  diseaseName: {
    type: String,
    default: ""
  },
  confidence: {
    type: String,
    default: ""
  },
  severity: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  },
  answers: {
    skinType: { type: String, required: true },
    primaryConcern: { type: String, required: true },
    ageGroup: { type: String, required: true },
    lifestyle: { type: String, required: true }
  },
  recommendations: {
    products: [
      {
        category: String,
        name: String,
        why: String,
        icon: String // Storing lucide icon name representation
      }
    ],
    foodTips: [
      {
        label: String,
        tip: String,
        icon: String // Storing lucide icon name representation
      }
    ],
    routine: {
      morning: String,
      night: String
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("SkinAnalysis", skinAnalysisSchema);
