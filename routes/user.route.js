const express = require("express")
const bodyParser = require("body-parser")
const {extend} = require("lodash")
const {User} = require("../models/user.model")
const {Video} = require("../models/video.model")

const { findUserById } = require("../middleware/findUserById.middleware.js")
const { verifyToken }  = require("../middleware/verifytoken.middleware")


const router = express.Router()
router.use(bodyParser.json())

router.use(verifyToken,findUserById)


router.route("/")
.get(async(req,res) => {
  res.status(404).json({message:"get request not allowed"})
})

.post(async(req,res) => {
  const {foundUser:user} = req
  const tokens = req.authorizedTokens
  switch(req.query.type){

    case "get-user-info" : 
    {
      try{
        const savedUser = await User.findById(req.body.userId)
      .populate('history.video playlist.videos likedVideos watchLater')
      res.status(200).json({success:true,savedUser})
      }catch(e){
        res.status(500).json({success:false,savedUser:null})
      }
    }
    break;

    case "create-playlist" :
    try{
      const {name} = req.body
      user.playlist.unshift({name,dateCreated: new Date().toLocaleDateString()})
      await user.save()
      const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
      res.status(201).json({success:true,savedUser,tokens})
    }catch(e) {
      res.status(500).json({success:false,message:e.message})
    }
    break

    case "delete-playlist" : 
      try{
        const {playListId:id} = req.body
        await user.playlist.id(id).remove()
        await user.save()
        const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
        res.status(201).json({success:true,message:"playlist deletion successful",tokens,savedUser})
      }catch(e){
        res.status(500).json({success:false,message:e.message})
      }
      break;
    // videoId required in the body of the req

    case "add-to-watchlater" : 
      try{
        const {videoId} = req.body
        const video = await Video.findById(videoId)
        user.watchLater.push(video)
        await user.save()
        const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
        res.statu(201).json({success:true,savedUser,tokens})
      }catch(e){
        res.status(500).json({success:false,message:e.message})
      }
    break

    case "add-to-history" : 
      try{
        const {videoId} = req.body
        const video = await Video.findById(videoId)
        user.history.unshift({
          time: new Date().toLocaleDateString(),
          video
        })
        await user.save()
        const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
        res.status(201).json({success:true,savedUser,tokens})
      }catch(e){
        res.status(500).json({success:false,message:e.message})
      }
    break

    case "add-to-likedVideos" : 
      try{
        const {videoId} = req.body
        const video = await Video.findById(videoId)
        user.likedVideos.push(video)
        await user.save()
        const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
        res.status(201).json({success:true,savedUser,tokens})
      }catch(e){
        res.status(500).json({success:false,message:e.message})
      }
    break

    case "clear-history" : 
      try{
        user.history = []
        await user.save()
        const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
        res.status(201).json({success:true,message:"history cleared",tokens,savedUser})
      }catch(e){
        res.status(500).json({success:false,message:e.message})
      }
    break

    default : 
      const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
      res.status(500).json({success:false,message:"wrong params",tokens,savedUser})
  }
})


router.route("/:id")
.get(async (req,res) => {
  try{
    const id = req.params.id
    const foundPlayList = await user.playlist.id(id)
    res.status(200).json({success:true,foundPlayList})
  }catch(e){
    res.status(500).json({success:false,message:e.message})
  }
})
.post(async(req,res) => {
  const { foundUser : user } = req
  const { id : playListId } = req.params
  const { videoId } = req.body
  const tokens = req.authorizedTokens
  try{
    const playListToAdd = await user.playlist.id(playListId)
    console.log(playListToAdd)
    const videoInPL = await playListToAdd.videos.includes(videoId)
    console.log(videoInPL)
    if(videoInPL){
      throw new Error("video already in playlist")
    }
    user.playlist.id(playListId).videos.unshift(videoId)
    await user.save()
    const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
    res.status(200).json({success:true,savedUser,tokens})
  }catch(e){
    res.status(500).json({success:false,message:e.message})
  }
})
.delete(async(req,res) => {
  const { foundUser : user } = req
  const { id : playListId } = req.params
  const { videoId } = req.body
  const tokens = req.authorizedTokens
  const foundPlayList = await user.playlist.id(playListId)
  try{
    user.playlist.id(playListId).videos = foundPlayList.videos.filter(_id => _id!==videoId)
    await user.save()
    const savedUser = await User.findById(user._id).populate('history.video playlist.videos likedVideos watchLater')
    res.status(200).json({success:true,savedUser,tokens})
  }catch(e){
    res.status(500).json({success:false,message:e.message})
  }
})



module.exports = router
