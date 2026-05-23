const mongoose = require('mongoose');

const LesionLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    required: true
  },
  diameterMm: {
    type: Number,
    required: true
  },
  symptoms: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
    default: ''
  }
});

const LesionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  logs: [LesionLogSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesion', LesionSchema);
