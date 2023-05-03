const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// CREATE TOKEN

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      onboardingData: user.onboardingData ? user.onboardingData : null,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// signup user
const signUpUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("000", username, email, password, role);

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (!role) {
    return res.status(400).json({
      error: "Please select whether you are job seeker or recruiter",
    });
  }

  try {
    const user = await User.signup(username, email, password, role);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      username,
      email,
      role,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser, loginUser };
