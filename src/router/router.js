const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegecontroller")
const internController = require("../controller/internController")


router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)
router.get("/functionup/collegesDetails", internController.getCollegeDetails)



module.exports = router;