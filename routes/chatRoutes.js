const express = require("express");
const { sendMessage, getMessages } = require("../Controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(authMiddleware, sendMessage);
router.route("/:receiver").get(authMiddleware, getMessages);

module.exports = router;