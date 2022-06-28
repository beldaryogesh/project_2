const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegecontroller")
const internController = require("../controller/internController")


router.post("/functionup/colleges", collegeController.createCollege)



module.exports = router;