const mongoose = require("mongoose")
const {Schema,model} = mongoose

const tokenSchema =  new Schema({
    token:{
        type: String,
        required: true
    }
},{timestamps:true})

const Token = model("Token",tokenSchema)

module.exports = {Token}