const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const axios =require("axios")

router.use(bodyParser.json())

//model
const {User} = require("../models/user.model")
const {Token} = require("../models/refreshToken.model")

router.route("/")
.get(async (req,res) => {
    const users = await User.find()
    res.status(200).json({users})
})
.post(async(req,res) => {
    try{
        const {username,email,password} = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = {username,email,password:hashedPassword}
        const token = await axios.post("https://jwt-server.ghozt777.repl.co/gen-token",{user,time:"200"}) 
        const savedUser = await new User(user).save()
        await Token({token:token.data.refreshToken}).save()
        res.status(201).json({success:true,msssage:"user creation successfull",savedUser,accessToken:token.data.accessToken,refreshToken:token.data.refreshToken})
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
})

module.exports = router