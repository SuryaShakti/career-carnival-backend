const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    onboardingData: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

// Static sign up method
userSchema.statics.signup = async function (username, email, password, role) {
  console.log(username, email, password, role);
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email is already registered!!");
  }

  // encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash, email, role });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  console.log("----------", email, password);

  if (!user) {
    throw Error("Incorrect Email");
  }

  // match the both data
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
