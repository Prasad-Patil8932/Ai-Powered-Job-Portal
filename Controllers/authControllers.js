const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const bcrypt = require("bcryptjs");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, role });
  const token = user.generateAuthToken();
  sendResponse(res, 201, true, "User registered successfully", { token });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const token = user.generateAuthToken();
  sendResponse(res, 200, true, "Login successful", { token });
});
