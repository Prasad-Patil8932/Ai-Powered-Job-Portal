require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error Handler
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);
  
  socket.on("sendMessage", (data) => {
    io.to(data.receiverId).emit("receiveMessage", data);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));