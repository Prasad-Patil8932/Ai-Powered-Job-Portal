const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const ChatMessage = require("../models/ChatMessage");
const { getIO } = require("../utils/socket");

exports.sendMessage = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const chatMessage = await ChatMessage.create({ sender: req.user.id, receiver, message });
  
  const io = getIO();
  io.to(receiver).emit("receiveMessage", chatMessage);

  sendResponse(res, 201, true, "Message sent successfully", chatMessage);
});