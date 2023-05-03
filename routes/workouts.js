const express = require("express");
const workout = require("../models/workoutModel");
const workoutModel = require("../models/workoutModel");
const {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Get all workouts
router.get("/", getAllWorkouts);

// set a signle workout
router.get("/:id", getAWorkout);

// POST A WORKOUT
router.post("/", createWorkout);

// DELETE A WORKOUT
router.delete("/:id", deleteWorkout);

// UPDATE A WORKOUT
router.patch("/:id", updateWorkout);

module.exports = router;
