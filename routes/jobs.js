const express = require("express");
const {
  getAllJobs,
  getAJob,
  createJob,
  deleteJob,
  getAllJobsOfRecruiter,
} = require("../controllers/jobController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// create a job
router.post("/", createJob);

// Get all jobs
router.get("/", getAllJobs);

// Get all jobs of a recruiter
router.get("/byRecruiter", getAllJobsOfRecruiter);

// Get a job details
router.get("/:id", getAJob);

// DELETE A Job
router.delete("/:id", deleteJob);

module.exports = router;
