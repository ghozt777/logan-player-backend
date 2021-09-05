const {Video} = require("../models/video.model")
const findVideo = async (req,res,next,videoId) => {
    try{
        const foundVideo = await Video.findById(videoId)
        if(!foundVideo) return res.status(404).json({success:false,message:`video with id ${videoId} not found`})
        req.video = foundVideo
        next()
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}

module.exports = {findVideo}