const jwt = require("jsonwebtoken")
const axios = require("axios")
const {Token} = require("../models/refreshToken.model")

async function verifyToken(req,res,next){
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
                req.authorizedTokens = {
                    accessToken:token,
                    refreshToken:req.body.token
                }
                req.body.username=user.username
                next()
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
            return res.status(500).json({success:false,message:"internal server error"})
        }
        // adding the newly generated refresh token to the db
        await new Token({token:token.data.refreshToken}).save()
        req.authorizedTokens = {
            accessToken:token.data.accessToken,
            refreshToken:token.data.refreshToken
        }
        next()
    }

}

module.exports = {verifyToken}