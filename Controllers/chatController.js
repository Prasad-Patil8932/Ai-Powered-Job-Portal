const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const ChatMessage = require("../Models/ChatMessage");

exports.sendMessage = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const chatMessage = await ChatMessage.create({ sender: req.user.id, receiver, message });
  sendResponse(res, 201, true, "Message sent successfully", chatMessage);
});

exports.getMessages = asyncHandler(async (req, res) => {
  const { receiver } = req.params;
  const messages = await ChatMessage.find({
    $or: [
      { sender: req.user.id, receiver },
      { sender: receiver, receiver: req.user.id },
    ],
  }).sort({ createdAt: 1 });
  sendResponse(res, 200, true, "Messages retrieved successfully", messages);
});
