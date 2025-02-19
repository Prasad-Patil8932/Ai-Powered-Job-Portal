const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const { search, location, salaryMin, salaryMax, skills } = req.query;
  let jobFilter = {};

  if (search) {
    jobFilter.title = { $regex: search, $options: "i" };
  }
  if (location) {
    jobFilter.location = { $regex: location, $options: "i" };
  }
  if (salaryMin || salaryMax) {
    jobFilter.salary = {};
    if (salaryMin) jobFilter.salary.$gte = parseInt(salaryMin);
    if (salaryMax) jobFilter.salary.$lte = parseInt(salaryMax);
  }

  const [totalJobs, totalApplications, totalUsers, recentJobs, recentApplications] = await Promise.all([
    Job.countDocuments(jobFilter),
    Application.countDocuments(),
    User.countDocuments(),
    Job.find(jobFilter).sort({ createdAt: -1 }).limit(5),
    Application.find().sort({ appliedAt: -1 }).limit(5).populate("job"),
  ]);

  let recommendedJobs = [];
  if (skills) {
    const aiResponse = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Based on the following skills, suggest job roles: ${skills}`,
      max_tokens: 50,
    });
    const aiSuggestedRoles = aiResponse.choices[0].text.split(",").map((role) => role.trim());
    recommendedJobs = await Job.find({ title: { $in: aiSuggestedRoles } }).limit(3).select("title company location salary");
  }

  sendResponse(res, 200, true, "Dashboard statistics retrieved successfully", {
    totalJobs,
    totalApplications,
    totalUsers,
    recentJobs,
    recentApplications,
    recommendedJobs,
  });
});
