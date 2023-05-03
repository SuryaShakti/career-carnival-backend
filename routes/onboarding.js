const express = require("express");
const {
  getOnboardingData,
  createUserOnboarding,
  createRecruiterOnboarding,
  getRecruiterOnboardingData,
} = require("../controllers/onboardingController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// get onboarding data
router.get("/", getOnboardingData);

// get onboarding data
router.get("/recruiter", getRecruiterOnboardingData);

// Create Onboading Data for user
router.post("/user", createUserOnboarding);

// Create Onboading Data for recruiter
router.post("/recruiter", createRecruiterOnboarding);

module.exports = router;
