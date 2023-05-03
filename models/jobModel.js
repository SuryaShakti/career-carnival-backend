const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    empType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: Array,
      required: true,
    },
    requirements: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: {
      type: Array,
      required: true,
    },
    experience: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
