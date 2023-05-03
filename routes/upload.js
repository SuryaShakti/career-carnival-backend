const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "ddip2feqf",
  api_key: "933243996898567",
  api_secret: "eJrbkIxQ-0QSD3tKimNaIt5-Uy8",
});

router.post("/", (req, res) => {
  const file = req.files.image;
  var image_url;
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    console.log(result);
    image_url = result.url;
    res.status(200).json({ url: result.url });
  });
});

module.exports = router;
