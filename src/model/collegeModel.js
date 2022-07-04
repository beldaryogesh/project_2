const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      uppercase:true,
      required: [true, "college name is required"],
      
    },
    fullName: {
      type: String,
      required: [true, "college first name is required"],
      
    },
    logoLink: {
      type: String,
      required: [true, "logoLink is required"],
      
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);