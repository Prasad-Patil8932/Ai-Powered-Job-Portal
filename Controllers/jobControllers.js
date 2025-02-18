const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");

exports.createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, recruiter: req.user.id });
  sendResponse(res, 201, true, "Job created successfully", job);
});

exports.getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate("recruiter", "name email");
  sendResponse(res, 200, true, "Jobs retrieved successfully", jobs);
});

exports.getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("recruiter", "name email");
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  sendResponse(res, 200, true, "Job retrieved successfully", job);
});

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  if (job.recruiter.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this job");
  }
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendResponse(res, 200, true, "Job updated successfully", updatedJob);
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  if (job.recruiter.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this job");
  }
  await job.remove();
  sendResponse(res, 200, true, "Job deleted successfully");
});
