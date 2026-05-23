const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getLesions,
  createLesion,
  addLesionLog,
  deleteLesion
} = require("../controllers/lesionController");

router.get("/", protect, getLesions);
router.post("/", protect, createLesion);
router.post("/:id/log", protect, addLesionLog);
router.delete("/:id", protect, deleteLesion);

module.exports = router;
