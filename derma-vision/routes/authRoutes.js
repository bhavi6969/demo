const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET CURRENT USER PROFILE
router.get("/me", protect, getMe);

// UPDATE CURRENT USER PROFILE
router.put("/me", protect, updateProfile);

module.exports = router;