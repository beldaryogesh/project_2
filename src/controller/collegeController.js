const collegeModel = require("../model/collegeModel");

//===============POST/College====================
const createCollege = async function (req, res) {
  try {
     let data = req.body;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "plz enter details for create college",
      });
    }
    if (!data.name) {
      return res.status(400).send({
        status: false,
        message: "College name is required for create a college doc",
      });
    }
    // college short name validation
    if (!/(^[a-zA-Z]{0,20}$)/.test(data.name)) {
      return res
        .status(400)
        .send({ status: false, message: "plz use alpha words ,dont use space between letters for college short name" });
    }
    let isValidName = await collegeModel.findOne({ name: data.name });
    if (isValidName) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Already one college registered with this same name",
        });
    }
    if (!data.fullName) {      
      return res
      .status(400).send({
        status: false,
        message: "college fullname is required for creating a college doc ",
      });
    }
    if (!/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/.test(data.fullName)) {
      return res
        .status(400)
        .send({ status: false, message: "plz use alpha words in full name ,dont use space between letters for college full name" });
    }
   
    let isValidFullName = await collegeModel.findOne({
      name: data.fullName,
    });
    if (isValidFullName) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Already one college registered with this same full name",
        });
    }

    /////======== logolink validation=======/////

    if (!data.logoLink) {
      return res
        .status(400)
        .send({
          status: false,
          message: "logolink is required for creating a college doc",
        });
    }
    // logolink validation whether that link ends with .(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif)
    if (
      !/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(
        data.logoLink
      )  
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid logoLink" });
    }


    let collegeCreated = await collegeModel.create(data);
    res.status(201).send({ status: true, data: collegeCreated });
  } catch (err) {
    res.status(500).send({ status: false, err: err.message });
  }
};

module.exports.createCollege = createCollege;