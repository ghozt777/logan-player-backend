const mongoose = require("mongoose")
require("mongoose-type-email")
const {Schema,model} = mongoose


const playListSchema = new Schema(
  {
      name:{
        type: String,
        required: "can't create a playlist without a name"      
        },
      dateCreated:{
        type: String
      },
      videos:[
        {
          type: Schema.Types.ObjectId,
          ref: "Video"
        }
      ]
    }
)

const userSchema = new Schema({
    username:{
        type: String,
        required: "cant create a user without a username",
        unique:"username already taken"
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        required: "cant create a user without a username"
    },
    password:{
        type: String,
        required:"cant create a user without a password"
    },
    playlist:[{
      name:{
        type: String,
        required: "can't create a playlist without a name"      
      },
      videos:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
      }]
    }],
    history:[
      {
        time: String,
        video:{
          type:Schema.Types.ObjectId,
          ref: "Video"
        }
      }
    ],
    watchLater:[{
      type:Schema.Types.ObjectId,
      ref: "Video"
    }],
    likedVideos:[{
      type:Schema.Types.ObjectId,
      ref: "Video"
    }]
},{timestamps:true})

const User = model("User",userSchema)

module.exports = {User}