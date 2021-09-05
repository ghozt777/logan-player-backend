const mongoose = require("mongoose")
require("mongoose-type-email")
const {Schema,model} = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: "cant create a user without a username"
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        required: "cant create a user without a username"
    },
    password:{
        type: String,
        required:"cant create a user without a password"
    }
},{timestamps:true})

const User = model("User",userSchema)

module.exports = {User}