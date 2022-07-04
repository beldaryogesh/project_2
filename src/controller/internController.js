const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")

//POST/INTERN

const createIntern = async function(req, res){
    try {
        let data = req.body
        if(Object.keys(data).length == 0){
            return res.status(400).send({status:false, message:"Enter detail to create the intern"})
        }
        if(!data.name){
            return res.status(400).send({status:false, message:"Candidate name is required "})
        }
        if(data.name.length == 0 ){
            return res.status(400).send({status:false, message:"Candidate name is not empty"})
        }
        //candidate name validation
        if(!/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/.test(data.name)){
            return res.status(400).send({status:false, message:"Enter the valid name with title & don't use number or special character"})
        }
        if(!data.email){
            return res.status(400).send({status:false, message:"Candidate email is required "})
        }
        //validation email
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
            return res.status(400).send({status:false, message:"Enter the valid EmailId"}) 
        }

        let isRegisteredEmail = await internModel.find({email: data.email})
        if(isRegisteredEmail.length != 0){
            return res.status(400).send({status:false, message:"Candidate email is already registered "})
        }
        if(!data.mobile){
            return res.status(400).send({status:false, message:"candidate mobile is required "})
        }
        if(!/^[6,9]\d{9}$/
        .test(data.mobile)){
            return res.status(400).send({status:false, message:"Please enter the valid mobile number"})
        }
        let isRegisteredMobile = await internModel.find({mobile: data.mobile})
        if(isRegisteredMobile.length != 0){
            return res.status(400).send({status:false, message:"Candidate mobile number is already registered "})
        }
        if(!data.collegeName){
            return res.status(400).send({status:false, message:"College name is required "})
        }
        if( data.collegeName.length == 0 ){
            return res.status(400).send({status:false, message:"Enter valid college id"})
        }
        let collegeName = data.collegeName.toUpperCase()
        let isCollegeName =await collegeModel.findOne({name: collegeName})
        if(!isCollegeName){
            return res.status(400).send({status:false, message:"your college is not registered with us "})
        }

        data.collegeId = isCollegeName._id
        delete data.collegeName

        let internCreated = await internModel.create(data)

            res.status(201).send({status:true, data: internCreated})
            
    } catch (error) {
            res.status(500).send({status:false, msg: error.message})
    }
}


// Get/Functionup/collegedetails

const getCollegeDetails = async function(req, res){
    try {
        let clgName = req.query.collegeName
        if(!clgName){
            return res.status(400).send({status:false, message:" Please provide proper college name"})
        }
        let collegeName = req.query.collegeName.toUpperCase()
        let isValidCollege =await collegeModel.findOne({name: collegeName})
        if(!isValidCollege){
            return res.status(400).send({status:false, message:"Invalid college name"})
        }
        let getIntern =await internModel.find({collegeId: isValidCollege._id, isDeleted: false}).select({name: 1, mobile: 1, email: 1})
        if(getIntern.length == 0){
            return res.status(400).send({status:false, message:"No intern found with this college details"})
        }
        const getAllIntern = {
            name: isValidCollege.name,
            fullName: isValidCollege.fullName,
            logoLink: isValidCollege.logoLink,
            interns: getIntern
        }
            res.status(200).send({satus: true, data: getAllIntern})

    } catch (error) {
            res.status(500).send({status:false, msg: error.message})
    }
}

module.exports.createIntern= createIntern;
module.exports.getCollegeDetails = getCollegeDetails;