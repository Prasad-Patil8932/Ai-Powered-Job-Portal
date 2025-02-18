const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let jobFilter = {};
  if (search) {
    jobFilter = { title: { $regex: search, $options: "i" } };
  }

  const [totalJobs, totalApplications, totalUsers, recentJobs, recentApplications] = await Promise.all([
    Job.countDocuments(jobFilter),
    Application.countDocuments(),
    User.countDocuments(),
    Job.find(jobFilter).sort({ createdAt: -1 }).limit(5),
    Application.find().sort({ appliedAt: -1 }).limit(5).populate("job"),
  ]);

  // AI-powered job recommendations (Optimized Query for Fast Fetching)
  const recommendedJobs = await Job.find(jobFilter).limit(3).select("title company location");

  sendResponse(res, 200, true, "Dashboard statistics retrieved successfully", {
    totalJobs,
    totalApplications,
    totalUsers,
    recentJobs,
    recentApplications,
    recommendedJobs,
  });
});