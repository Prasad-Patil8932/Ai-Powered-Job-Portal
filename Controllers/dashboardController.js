const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();
  const totalUsers = await User.countDocuments();
  
  sendResponse(res, 200, true, "Dashboard statistics retrieved successfully", {
    totalJobs,
    totalApplications,
    totalUsers,
  });
});