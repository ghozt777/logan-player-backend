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
                <body style="background-color:#E0E7FF;">
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
                </body>
                `, 
            });

        }catch(e){
            return res.status(500).json({success:false,message:"internal server error",errorMessage:e.message})
        }

        return res.status(201).json({success:true,message:"email sent"})

})

router.route("/:token")
.get(async(req,res) => {

        const token = req.params.token
        let foundUser
        try{
            jwt.verify(token,process.env.EMAIL_TOKEN_SECRET,(err,user) => {
                if(err) throw new Error()
                else foundUser = user
            })
        }catch(e){
            return res.status(401).send(`
            <h1>Looks Like the token is tampered ☹ ️</h1>
            <p>Please request another mail  📨 and dont tamper the token to reset password successfully</p>
            `)
        }

        return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h2>Welcome ${foundUser.username}</h2>
            <small>Enter a new password</small>
                    <input type="password" name="password" id="password" placeholder="password"/>
                    <input type="password" name="confirmPassword" id="confirm-password" placeholder="confirm password"/>
                    <button id="submit">submit</button>
                    <button id="test">test</button>
        </body>
        <script>
            const password = document.querySelector("#password")
            const cfrmPassword = document.querySelector("#confirm-password")
            const submit = document.querySelector("#submit")
            password.addEventListener("change",(e) => {
                password.value=e.target.value
            })
        
            
            cfrmPassword.addEventListener("change",(e) => {
                cfrmPassword.value=e.target.value
                console.log(cfrmPassword)
            })


            function submitData(e){
                e.preventDefault()
                if(password.value===cfrmPassword.value){
                        fetch("http://localhost:5000/reset-password/landing",{
                        method : "POST",
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        mode:"cors",
                        cache: 'default',
                        body:JSON.stringify({
                            data:{
                                password:password.value,
                                confirmPassword:cfrmPassword.value,
                                foundUser:'${foundUser.username}'
                            }
                        })
                    }).then(response => {
                        if(response.ok) window.location.replace("http://localhost:5000/")
                    }).catch(e => console.error(e))
                }else{
                    alert("password and conform password dont match please check !")
                }
                
            }
        
            submit.addEventListener("click",submitData)
        
        
        </script>
        </html>
        `)
})


router.route("/landing")
.post(async (req,res) => {
    try{
        const {password,foundUser} = req.body.data
        console.log(password,foundUser)
        let user = await User.findOne({username:foundUser})
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password,salt)
        const updatedUser = {password:hashPassword}
        user = lodash.extend(user,updatedUser)
        await user.save()
        res.status(200).json({success:true})
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"internal server error"})
    }
})

module.exports = router
