const express =require("express")
const axios = require("axios")
const bodyParser = require("body-parser")
const router = express.Router()
const jwt =require("jsonwebtoken")

router.use(bodyParser.json())

// db 
const {Token} = require("../models/refreshToken.model")

router.route("/")
.post(async(req,res) => {
    // checking if the refresh token is valid
    const rt = req.body.token
    try{
        const foundToken = await Token.findOne({token:rt})
        if(!foundToken) return res.status(401).json({success:false,message:"not a valid refresh token"})
    }catch(err){
        return res.status(500).json({success:false,message:"internal server error"})
    }
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null){
        return res.status(401).json({success:false,message:"can't login without a access-token"})
    }
    
    try{
        // local validation 
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err) throw new Error()
            else{
                res.status(200).json({success:true,...user,accessToken:token,refreshToken:req.body.token})
            }
        })
    }catch(err){
        // automatic regeneration of accestoken through refresh token
        const refreshToken = req.body.token
        if(!refreshToken){
            return res.status(500).json({success:false,message:"no refresh token in body"})
        }
        const foundToken = await Token.findOne({token:refreshToken})
        if(!foundToken){
            return res.status(500).json({success:false,message:"not a valid refresh token"})
        }
        let foundUser
        //exracting user from the refresh token
        jwt.verify(foundToken.token,process.env.REFRESH_TOKEN_SECRET, (err,user) => {
            if(err){
                return res.status(401).json({success:false,foundToken})
             }
             foundUser = user
        })
        // forwarding the request to JWT server
        const token = await axios.post("https://jwt-server.ghozt777.repl.co/gen-token",{user:{username:foundUser.username,email:foundUser.email,password:foundUser.password},time:"200"}) 
        // updating refresh token collection of the db with the new refreshtoken
        // deleting the old token from the collection
        try{
            await foundToken.delete()
        }catch(err){
            res.status(500).json({success:false,message:"internal server error"})
        }
        // adding the newly generated refresh token to the db
        await new Token({token:token.data.refreshToken}).save()
        res.status(200).json({success:true,user:{...foundUser},accessToken:token.data.accessToken,refreshToken:token.data.refreshToken})
    }

})

module.exports = router