const jobModel = require("../models/jobModel");
const mongoose = require("mongoose");

// Get all Jobs
const getAllJobs = async (req, res) => {
  const jobs = await jobModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user", "username email role");
  res.status(200).json(jobs);
};

// Get all Jobs of recruiter
const getAllJobsOfRecruiter = async (req, res) => {
  const user = req.user._id;
  console.log(req.user);

  // const jobs = await jobModel.find({ user }).sort({ createdAt: -1 });
  const jobs = await jobModel
    .find({ user })
    .sort({ createdAt: -1 })
    .populate("user", "username email role");
  res.status(200).json(jobs);
};

// Get a signle JOB
const getAJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ eror: "No Such Job Available" });
  }

  const job = await jobModel.findById(id);

  if (!job) {
    return res.status(404).json({ error: "No Such Job available" });
  }
  res.status(200).json(job);
};

// create a JOB
const createJob = async (req, res) => {
  const {
    title,
    description,
    image,
    location,
    empType,
    salary,
    responsibilities,
    requirements,
    company,
    skills,
    experience,
  } = req.body;

  // add docs to db
  try {
    const user_id = req.user._id;
    const job = await jobModel.create({
      title,
      description,
      image,
      location,
      empType,
      salary,
      responsibilities,
      requirements,
      company,
      user: user_id,
      skills,
      experience,
    });

    const populatedJob = await job.populate("user", "username email role");

    res.status(200).json(populatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A WORKOUT
const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Job Available" });
  }

  const job = await jobModel.findByIdAndDelete({ _id: id });

  if (!job) {
    return res.status(404).json({ error: "No Such Job available" });
  }
  res.status(200).json(job);
};

module.exports = {
  getAllJobs,
  getAJob,
  createJob,
  deleteJob,
  getAllJobsOfRecruiter,
};
