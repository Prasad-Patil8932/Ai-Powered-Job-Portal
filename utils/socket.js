let io;
exports.initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: { origin: "*" },
  });
  return io;
};
exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};