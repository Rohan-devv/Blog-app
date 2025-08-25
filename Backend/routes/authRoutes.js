// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;   // ✅ export properly
