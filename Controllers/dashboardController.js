const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();
  const totalUsers = await User.countDocuments();
  const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);
  const recentApplications = await Application.find().sort({ appliedAt: -1 }).limit(5).populate("job");
  
  sendResponse(res, 200, true, "Dashboard statistics retrieved successfully", {
    totalJobs,
    totalApplications,
    totalUsers,
    recentJobs,
    recentApplications,
  });
});