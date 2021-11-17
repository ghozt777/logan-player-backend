const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const axios = require("axios")
const {User} = require("../models/user.model")

//db
const {Token} = require("../models/refreshToken.model")

//middleware
const {findUser} = require("../middleware/findUser.middleware")

router.use(bodyParser.json())

router.use("/",findUser)

router.route("/")
.post(async(req,res) => {
    const {password} = req.body
    if(password==null) return res.status(401).json({success:false,message:"cant login without a password"})
    const user = req.foundUser
    if(await bcrypt.compare(password,user.password)){
        try{
            const tokens = await axios.post("https://jwt-server.ghozt777.repl.co/gen-token",{user:{username:user.username,email:user.email,password:user.password},time:"200"})
            await new Token({token:tokens.data.refreshToken}).save()
            const savedUser = await User.findById(user._id)
              .populate('history.video playlist.videos likedVideos watchLater')
            res.status(201).json({success:true,
            savedUser,
            accessToken:tokens.data.accessToken,refreshToken:tokens.data.refreshToken})
        }catch(err){
            return res.status(500).json({success:false,messag:"internal server error"})
        }
    }else{
        res.status(401).json({success:false,message:"wrong password"})
    }
})

module.exports = router