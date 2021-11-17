const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

router.use(bodyParser.json())

// db
const {Token} = require("../models/refreshToken.model")

router.route("/")
.delete(async(req,res) => {
    try{
        const token = req.body.token
        console.log(token)
        const foundToken = await Token.findOne({token:token})
        await foundToken.delete()
        res.status(201).json({success:true,message:"logout successful"})
    }catch(err){
      console.log(err.message)
        res.status(500).json({success:false,message:"internal server error"})
    }
})

module.exports = router