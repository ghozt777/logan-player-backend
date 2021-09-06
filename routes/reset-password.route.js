const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const lodash = require("lodash")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const {User} = require("../models/user.model")
const {findUser} = require("../middleware/findUser.middleware")
const jwt = require("jsonwebtoken")
router.use(bodyParser.json())

router.route("/")
.get(async(req,res) => {
    const {email} = req.body
    const foundUser = await User.findOne({email})
    if(!foundUser) return res.status(404).json({success:false,message:`user with email address ${email} not found please check the email id`})
    const user = {
        username:foundUser.username,
        email:foundUser.email
    }
    const emailToken = jwt.sign(user,process.env.EMAIL_TOKEN_SECRET)

        try{
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD, 
                },
            });
        
            let info = await transporter.sendMail({
                from: '"GHozt R 👻" <ghoztr777@gmail.com>', // sender address
                to: foundUser.email, // list of receivers
                subject: "Hello ✔", 
                html: `
                <h1>Greetings from Logan Player Team</h1>
                <a href="http://localhost:5000/reset-password/${emailToken}"><button>reset</button></a>
                `, 
            });

        }catch(e){
            res.status(500).json({success:false,message:"internal server error",errorMessage:e.message})
        }

        res.status(201).json({success:true,message:"email sent"})

})

router.route("/:token")
.get(async(req,res) => {
    const token = req.params.token
    res.status(200).json({token})

})

module.exports = router
