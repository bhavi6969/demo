const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  saveSkinAnalysis,
  getLatestSkinAnalysis,
  getSkinAnalysisHistory
} = require("../controllers/analysisController");

router.post("/", protect, saveSkinAnalysis);
router.get("/latest", protect, getLatestSkinAnalysis);
router.get("/history", protect, getSkinAnalysisHistory);

module.exports = router;
