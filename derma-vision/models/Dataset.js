const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({

  diseaseName: {
    type: String,
    required: true
  },

  imageName: {
    type: String,
    required: true
  },

  imagePath: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Dataset", datasetSchema);