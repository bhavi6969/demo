const SkinAnalysis = require("../models/SkinAnalysis");

// @desc    Save skin analysis
// @route   POST /api/analysis
// @access  Private
const saveSkinAnalysis = async (req, res) => {
  const {
    scanId,
    diseaseId,
    diseaseName,
    confidence,
    severity,
    imageUrl,
    answers,
    recommendations
  } = req.body;

  if (!answers || !recommendations) {
    return res.status(400).json({
      success: false,
      message: "Please provide questionnaire answers and recommendations"
    });
  }

  try {
    const analysis = await SkinAnalysis.create({
      userId: req.user._id,
      scanId,
      diseaseId,
      diseaseName,
      confidence,
      severity,
      imageUrl,
      answers,
      recommendations
    });

    res.status(201).json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error("Error in saveSkinAnalysis:", error);
    res.status(500).json({
      success: false,
      message: "Server Error saving skin analysis"
    });
  }
};

// @desc    Get latest skin analysis
// @route   GET /api/analysis/latest
// @access  Private
const getLatestSkinAnalysis = async (req, res) => {
  try {
    const latest = await SkinAnalysis.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      analysis: latest || null
    });
  } catch (error) {
    console.error("Error in getLatestSkinAnalysis:", error);
    res.status(500).json({
      success: false,
      message: "Server Error retrieving latest skin analysis"
    });
  }
};

// @desc    Get skin analysis history
// @route   GET /api/analysis/history
// @access  Private
const getSkinAnalysisHistory = async (req, res) => {
  try {
    const history = await SkinAnalysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error("Error in getSkinAnalysisHistory:", error);
    res.status(500).json({
      success: false,
      message: "Server Error retrieving skin analysis history"
    });
  }
};

module.exports = {
  saveSkinAnalysis,
  getLatestSkinAnalysis,
  getSkinAnalysisHistory
};
