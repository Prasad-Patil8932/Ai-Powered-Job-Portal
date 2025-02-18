const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const Notification = require("../models/Notification");

exports.createNotification = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;
  const notification = await Notification.create({ user: userId, message });
  sendResponse(res, 201, true, "Notification created successfully", notification);
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  sendResponse(res, 200, true, "Notifications retrieved successfully", notifications);
});