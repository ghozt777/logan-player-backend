const {User} = require("../models/user.model")
const findUser = async (req,res,next) => {
    

    try{
        const username = req.body.username
        const foundUser = await User.findOne({username:username})
        if(!foundUser) return res.status(404).json({success:false,message:`user with username ${username} not found`})
        req.foundUser = foundUser
        next()
    }catch(err){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

module.exports = {findUser}