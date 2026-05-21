const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

  name: String,

  specialization: String,

  hospitalName: String,

  contactInfo: String,

  experience: Number,

  availability: String

});

module.exports = mongoose.model("Doctor", doctorSchema);