const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()
router.use(bodyParser.json())
// model
const {Video} = require("../models/video.model")


//middleware
const {findVideo}  = require("../middleware/findVideo.middleware")
router.param("videoId",findVideo)


router.route('/')
.get(async(req,res) => {
    try{
        const videos = await Video.find().populate("comments.user")
        res.status(200).json({success:true,videos})
    }catch(err){
        res.status(500).json({success:false,message:`error with message: ${err.message}`})
    }
})
.post(async(req,res) => {
    try{
        const newVideo = req.body
        const savedVideo = await new Video(newVideo).save()
        res.status(201).json({success:true,savedVideo})
    }catch(err){
        res.status(500).json({success:false,message:`error with message ${err.message}`})
    }
})

router.route("/:videoId")
.get((req,res) => {
    const {video} = req
    res.status(200).json({success:true,video})
})
.delete(async(req,res) => {
    try{
        let {video} = req
        await video.delete()
        res.status(200).json({success:true,message:"video deletion successful"})
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
})

module.exports = router