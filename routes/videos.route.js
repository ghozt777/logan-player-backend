const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()
const lodash = require("lodash")
router.use(bodyParser.json())
// model
const {Video} = require("../models/video.model")


//middleware
const {findVideo}  = require("../middleware/findVideo.middleware")
const {findUser} = require("../middleware/findUser.middleware")
const { verifyToken } = require("../middleware/verifytoken.middleware")

router.param("videoId",findVideo)
router.use("/:videoId",verifyToken,findUser)


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
    const {video,authorizedUser} = req
    res.status(200).json({success:true,video,authorizedUser})
})

.post(async(req,res) => {

    try{
        const video = req.video
        const foundUser = req.foundUser
        const tokens = req.authorizedTokens
        switch(req.query.type){
            case "add-comment":
                const comment = req.body.comment
                video.comments.unshift({user:foundUser,content:{time:new Date().toLocaleDateString(),description:comment}})
                await video.save()
                let updatedVideo = await Video.findById(video._id).populate("comments.user" , "username")
                res.status(200).json({success:true,updatedVideo,tokens})
                break;

            case "like":
                video = lodash.extend(video,{like:video.like ? video.like+1 : 1})           
                await video.save()
                res.status(200).json({video})

            case "dislike":
                video = lodash.extend(video,{like:video.dislike ? video.dislike+1 : 1})           
                await video.save()
                res.status(200).json({video})

            default:
                res.status(500).json({success:false,message:"internal server error"})
                break;
        }
    }catch(err){
        res.status(500).json({success:false,errorMessage:err.message})
    }
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