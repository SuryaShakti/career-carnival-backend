const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/userController");

// login

router.post("/login", loginUser);

// signup
router.post("/signup", signUpUser);

module.exports = router;
