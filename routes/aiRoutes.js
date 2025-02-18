const express = require("express");
const { analyzeResume } = require("../Controllers/aiController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/analyze-resume", authMiddleware, analyzeResume);

module.exports = router;
