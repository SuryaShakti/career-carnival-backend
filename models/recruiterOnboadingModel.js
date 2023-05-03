const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const recruiterOnboadingSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    conpanyAddress: {
      type: String,
      required: true,
    },
    companyCountry: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    conpanyEmail: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "recruiterOnboarding",
  recruiterOnboadingSchema
);
