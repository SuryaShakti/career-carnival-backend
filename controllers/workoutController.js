const workoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await workoutModel.find().sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// set a signle workout

const getAWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ eror: "No Such Workout" });
  }

  const workout = await workoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

// POST A WORKOUT
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //  add docs to db
  try {
    const workout = await workoutModel.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A WORKOUT

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await workoutModel.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

// UPDATE A WORKOUT

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await workoutModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
};
