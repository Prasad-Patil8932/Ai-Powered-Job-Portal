const express = require("express");
const {
  applyJob,
  getApplications,
  getJobApplications,
  updateApplicationStatus,
} = require("../Controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, applyJob)
  .get(authMiddleware, getApplications);
router.route("/:jobId").get(authMiddleware, getJobApplications);
router.route("/update/:id").put(authMiddleware, updateApplicationStatus);

module.exports = router;
