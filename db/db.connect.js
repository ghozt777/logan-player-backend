const res = require("express/lib/response")
const mongoose = require("mongoose")


const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_URL)
        console.log("connection successful")
    }catch(err){
        console.error("connection unsuccessful")
    }
}

module.exports = {dbConnect}