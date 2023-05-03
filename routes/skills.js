const express = require("express");
const router = express.Router();
const { getAllSkills, createSkill } = require("../controllers/skillController");

// fetch skills

router.get("/", getAllSkills);

// create skills
router.post("/", createSkill);

module.exports = router;
