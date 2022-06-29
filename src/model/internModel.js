const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "candidate first name is required"]
    },
    email: {
      type: String,
      
      lowercase: true,
      unique: true,
      required: [true, "candidate email id is required"]
    },
    mobile: {
      type: Number,
      required: [true, "Candidate mobile number is required"],
      unique: true
    },
    collegeId: {
      type:ObjectId,
      ref: "College"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Intern", internSchema);