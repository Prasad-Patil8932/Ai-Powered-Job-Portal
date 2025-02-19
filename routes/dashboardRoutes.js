const express = require("express");
const { getDashboardStats } = require("../Controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);

module.exports = router;