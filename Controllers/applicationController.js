const Application = require("../models/Application");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");

exports.applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const application = await Application.create({ job: jobId, applicant: req.user.id });
  sendResponse(res, 201, true, "Job application submitted successfully", application);
});

exports.getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user.id }).populate("job");
  sendResponse(res, 200, true, "Applications retrieved successfully", applications);
});

exports.getJobApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ job: req.params.jobId }).populate("applicant", "name email");
  sendResponse(res, 200, true, "Job applications retrieved successfully", applications);
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }
  application.status = req.body.status;
  await application.save();
  sendResponse(res, 200, true, "Application status updated", application);
});