const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({

  diseaseName: String,

  symptoms: [String],

  causes: [String],

  precautions: [String],

  treatments: [String]

});

module.exports = mongoose.model("Disease", diseaseSchema);