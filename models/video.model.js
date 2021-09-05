const mongoose = require("mongoose")
require('mongoose-type-url')

const {Schema,model} = mongoose

const videoSchema = new Schema({
    title:{
        type: String,
        required:"Cant create a video document without a title"
    },
    watchId:{
        type: String,
        require: "cant create a video document without a watch id"
    },
    videoLink:{
        type: mongoose.SchemaTypes.Url,
        required:"Cant create a video document without a video url"
    },
    thumbnail:{
        type: mongoose.SchemaTypes.Url,
    },
    description:{
        type: String
    },
    likeCount:{
        type: Number,
        min: 0
    },
    dislikeCount:{
        type: Number,
        min: 0
    },
    comments:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content:{
            time: String,
            description:{
                type: String,
                required: "cant add comments without a description"
            }
        }   
    }]
},{timestamps:true})


const Video = model("Video",videoSchema)

module.exports = {Video}