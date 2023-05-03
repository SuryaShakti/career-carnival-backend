const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userOnboadingSchema = new Schema(
  {
    skills: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userOnboarding", userOnboadingSchema);
