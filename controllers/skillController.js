const skillModel = require("../models/skillsModel");
const mongoose = require("mongoose");

// Get all Skills
const getAllSkills = async (req, res) => {
  const skills = await skillModel.find().sort({ createdAt: -1 });
  res.status(200).json(skills);
};

// set a signle workout

// const getAWorkout = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ eror: "No Such Workout" });
//   }

//   const workout = await workoutModel.findById(id);

//   if (!workout) {
//     return res.status(404).json({ error: "No Such Workout" });
//   }
//   res.status(200).json(workout);
// };

// POST A Skill
const createSkill = async (req, res) => {
  const { value, label } = req.body;

  //  add docs to db
  try {
    const skill = await skillModel.create({
      value,
      label,
    });
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSkills,
  createSkill,
};
