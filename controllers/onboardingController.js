const userOnboardingModel = require("../models/userOnboardingModel");
const recruiterOnboadingModel = require("../models/recruiterOnboadingModel");
const User = require("../models/userModel");

const mongoose = require("mongoose");

// GET ONBOARDING DATA

const getOnboardingData = async (req, res) => {
  const user = req.user._id;
  const onboardingData = await userOnboardingModel
    .find({ user })
    .populate("user", "username email role");
  res.status(200).json(onboardingData[0]);
};

// GET ONBOARDING DATA RECRUITER

const getRecruiterOnboardingData = async (req, res) => {
  const user = req.user._id;
  const onboardingData = await recruiterOnboadingModel
    .find({ user })
    .populate("user", "username email role");
  res.status(200).json(onboardingData[0]);
};

// create user onboarding data
const createUserOnboarding = async (req, res) => {
  const { skills, name, dob, address, occupation, avatar, experience } =
    req.body;

  // Checking wheter the data already exists or not exists
  const user_id = req.user._id;
  const data = await userOnboardingModel.find({ user_id });

  if (data.length > 0) {
    res.status(400).json({ error: "Onboarding data already exists" });
    return;
  }

  // Add data to docs
  try {
    console.log(req.user);
    const user_id = req.user._id;
    const onboardingData = await userOnboardingModel.create({
      skills,
      name,
      dob,
      address,
      occupation,
      avatar,
      experience,
      user: user_id,
    });
    const populatedData = await onboardingData.populate(
      "user",
      "username email role"
    );
    await User.findByIdAndUpdate(
      { _id: user_id },
      { onboardingData: populatedData }
    );
    res.status(200).json(populatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CREATE ONBOARDING DATA OF RECRUITER -----------------------
const createRecruiterOnboarding = async (req, res) => {
  const {
    companyName,
    conpanyAddress,
    companyCountry,
    companyLogo,
    conpanyEmail,
  } = req.body;

  // Checking wheter the data already exists or not exists
  const user_id = req.user._id;
  const data = await recruiterOnboadingModel.find({ user_id });

  if (data.length > 0) {
    console.log("data", data);
    console.log(req.user);
    res.status(400).json({ error: "Onboarding data already exists" });
    return;
  }

  // Add data to docs
  try {
    console.log(req.user);
    const user_id = req.user._id;
    const onboardingData = await recruiterOnboadingModel.create({
      companyName,
      conpanyAddress,
      companyCountry,
      companyLogo,
      conpanyEmail,
      user: user_id,
    });

    const populatedData = await onboardingData.populate(
      "user",
      "username email role"
    );
    await User.findByIdAndUpdate(
      { _id: user_id },
      { onboardingData: populatedData }
    );
    res.status(200).json(populatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOnboardingData,
  createUserOnboarding,
  createRecruiterOnboarding,
  getRecruiterOnboardingData,
};
