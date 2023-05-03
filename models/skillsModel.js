const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  label: String,
  value: String,
});

module.exports = mongoose.model("Skill", SkillSchema);
