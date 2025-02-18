const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getJobs).post(authMiddleware, createJob);
router
  .route("/:id")
  .get(getJobById)
  .put(authMiddleware, updateJob)
  .delete(authMiddleware, deleteJob);

module.exports = router;