const applicationModel = require("../models/applicationModel");
const mongoose = require("mongoose");

// Get all applications for a Job
const getAllApplicationsForAJob = async (req, res) => {
  const { job } = req.body;

  const applications = await applicationModel
    .find({ jobId: job })
    .sort({ createdAt: -1 })
    .populate("user", "username email role onboardingData");
  res.status(200).json(applications);
};

// CREATE AN APPLICATION
const createApplication = async (req, res) => {
  const { jobId, description, status } = req.body;
  console.log("sjkshk");
  // add docs to db
  try {
    const user_id = req.user._id;

    const check = await applicationModel.find({ jobId, user: user_id });
    console.log(check);

    if (check.length > 0) {
      res.status(400).json({ error: "You have already applied to the job." });
    }

    const application = await applicationModel.create({
      description,
      jobId,
      status,
      user: user_id,
    });

    const populatedJob = await application.populate(
      "user",
      "username email role"
    );

    res.status(200).json(populatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

module.exports = { getAllApplicationsForAJob, createApplication };
