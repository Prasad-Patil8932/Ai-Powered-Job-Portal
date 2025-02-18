const express = require("express");
const { createNotification, getNotifications } = require("../Controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(authMiddleware, createNotification).get(authMiddleware, getNotifications);

module.exports = router;
