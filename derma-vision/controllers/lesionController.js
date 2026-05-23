const Lesion = require("../models/Lesion");

// @desc    Get all lesions for the current user
// @route   GET /api/lesions
// @access  Private
const getLesions = async (req, res) => {
  try {
    const lesions = await Lesion.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      lesions
    });
  } catch (error) {
    console.error("Error in getLesions:", error);
    res.status(500).json({
      success: false,
      message: "Server Error retrieving lesions"
    });
  }
};

// @desc    Start tracking a new lesion
// @route   POST /api/lesions
// @access  Private
const createLesion = async (req, res) => {
  const { label, imageUrl, diameterMm, symptoms, notes } = req.body;

  if (!label || !imageUrl || !diameterMm) {
    return res.status(400).json({
      success: false,
      message: "Please provide a label, image, and diameter"
    });
  }

  try {
    const newLesion = await Lesion.create({
      userId: req.user._id,
      label,
      logs: [{
        date: new Date(),
        imageUrl,
        diameterMm,
        symptoms: symptoms || [],
        notes: notes || ''
      }]
    });

    res.status(201).json({
      success: true,
      lesion: newLesion
    });
  } catch (error) {
    console.error("Error in createLesion:", error);
    res.status(500).json({
      success: false,
      message: "Server Error creating lesion tracker"
    });
  }
};

// @desc    Add a log entry to a lesion
// @route   POST /api/lesions/:id/log
// @access  Private
const addLesionLog = async (req, res) => {
  const { imageUrl, diameterMm, symptoms, notes, date } = req.body;
  const lesionId = req.params.id;

  if (!imageUrl || !diameterMm) {
    return res.status(400).json({
      success: false,
      message: "Please provide an image and diameter for this log entry"
    });
  }

  try {
    const lesion = await Lesion.findOne({ _id: lesionId, userId: req.user._id });

    if (!lesion) {
      return res.status(404).json({
        success: false,
        message: "Lesion tracker not found"
      });
    }

    lesion.logs.push({
      date: date ? new Date(date) : new Date(),
      imageUrl,
      diameterMm,
      symptoms: symptoms || [],
      notes: notes || ''
    });

    await lesion.save();

    res.json({
      success: true,
      lesion
    });
  } catch (error) {
    console.error("Error in addLesionLog:", error);
    res.status(500).json({
      success: false,
      message: "Server Error adding lesion log"
    });
  }
};

// @desc    Delete a tracked lesion
// @route   DELETE /api/lesions/:id
// @access  Private
const deleteLesion = async (req, res) => {
  try {
    const lesion = await Lesion.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!lesion) {
      return res.status(404).json({
        success: false,
        message: "Lesion tracker not found"
      });
    }

    res.json({
      success: true,
      message: "Lesion tracker deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteLesion:", error);
    res.status(500).json({
      success: false,
      message: "Server Error deleting lesion"
    });
  }
};

module.exports = {
  getLesions,
  createLesion,
  addLesionLog,
  deleteLesion
};
