require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/jobs");
const uploadRoutes = require("./routes/upload");
const onboardingRoutes = require("./routes/onboarding");
const skillsRoutes = require("./routes/skills");
const applicationRoutes = require("./routes/applications");
const fileUpload = require("express-fileupload");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// upload image
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/onboadring", onboardingRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/application", applicationRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });

    app.get("/", (req, res) => {
      res.send("Hey this is my API running 🥳");
    });
  })
  .catch((error) => console.log(error));
