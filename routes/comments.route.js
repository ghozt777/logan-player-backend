const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const lodash = require("lodash")

router.use(bodyParser.json())

// db
const {Video} = require("../models/video.model")

//middleware
const {findVideo} = require("../middleware/findVideo.middleware")
const {findUser} = require("../middleware/findUser.middleware")

router.param("videoId",findVideo)
router.use("/:videoId",findUser)

router.route("/")
.get((req,res) => {
    res.status(401).json({success:false})
})

router.route("/:videoId")
.get(async(req,res) => {
    let video = req.video
    video = await Video.findById(video._id).populate("comments.user")
    res.status(200).json({success:true,comments:video.comments})
})
.post(async(req,res) => {
    try{
        const video = req.video
        const foundUser = req.foundUser
        switch(req.query.type){
            case "add-comment":
                const comment = req.body.comment
                video.comments.push({user:foundUser,content:{time:new Date().toLocaleDateString(),description:comment}})
                await video.save()
                let updatedVideo = await Video.findById(video).populate("comments","user")
                res.status(200).json({success:true,updatedVideo})
                break;

            // case "like":

            default:
                res.status(500).json({success:false,message:"internal server error"})
                break;
        }
    }catch(err){
        res.status(500).json({success:false,errorMessage:err.message})
    }
})

module.exports = router