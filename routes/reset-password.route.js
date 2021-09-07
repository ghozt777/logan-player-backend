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
                <h1 style="
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color:#1F2937;
                    font-size: 2rem;
                ">Greetings from Logan Player Team</h1>
                <small
                style="
                    display:block;
                    margin: 1rem auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color:#1F2937;
                "
                > Please click on the provided link below to reset your password </small>
                <a href="http://localhost:5000/reset-password/${emailToken}"><button style="
                    border-style: none;
                    padding: 1rem;
                    background-color: #1F2937;
                    color: white;
                    box-shadow: 0 8px 6px -2px #DDD6FE; 
                    min-height: 50px;
                    min-width: 70px;
                    border-radius: 0.5rem;
                    cursor: pointer;
                ">reset password</button></a>
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
    let foundUser
    jwt.verify(token,process.env.EMAIL_TOKEN_SECRET,(err,user) => {
        if(err) res.status(401).send(`
        <h1>Looks Like the token is tampered ☹ ️</h1>
        <p>Please request another mail  📨 and dont tamper the token to reset password successfully</p>
        `)
        else foundUser = user
    })

    res.status(200).send(`
    <h1>Welcome ${foundUser.username}</h1>
    <h2>Reset Password</h2>
    <small>Enter a new password</small>
    <form action="http://localhost:5000/reset-password/landing" method="POST">
        <input type="password" name="password" placeholder="password"/>
        <input type="password" name="confirm-password" placeholder="confirm password"/>
        <button type="submit">submit</button>
    </form>
    `)
})


router.route("/landing")
.post((req,res) => {

    console.log(req.body)

    res.status(200).send(`
    <h1>A OK Bruh !</h1>
    <a href="http://localhost:5000/"><button style="
                    border-style: none;
                    padding: 1rem;
                    background-color: #1F2937;
                    color: white;
                    box-shadow: 0 8px 6px -2px #DDD6FE; 
                    min-height: 50px;
                    min-width: 70px;
                    border-radius: 0.5rem;
                    cursor: pointer;
                "> Home </button></a>
    `)
})

module.exports = router
