const express = require("express");

const requireAuth = require("../middleware/requireAuth");
const {
  getAllApplicationsForAJob,
  createApplication,
} = require("../controllers/applicationController");

const router = express.Router();

// require auth for all Applications routes
router.use(requireAuth);

// Get all Applications of a specific job
router.get("/", getAllApplicationsForAJob);

// POST A Applications
router.post("/", createApplication);

// Reject A Applications
router.delete("/:id", () => {});

// UPDATE A Applications
router.patch("/:id", () => {});

module.exports = router;
