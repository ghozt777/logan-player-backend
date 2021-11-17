const { User } = require("../models/user.model")

const findUserById = async (req,res,next) => {
  try{
    const {userId:id} = req.body
    const foundUser = await User.findById(id)
    if(foundUser){ 
      req.foundUser = foundUser
      next()
    }
    else{
      res.status(404).json({success:false,message:"user not found"})
    }
  }catch(e){
    res.status(500).json({success:false,message:e.message})
  }

}

module.exports = { findUserById }