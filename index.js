const express = require("express")
const app = express()

// loading the .env file
require("dotenv").config()

//db connect
const {dbConnect} = require("./db/db.connect")
dbConnect()

// routes 
const home = require("./routes/home.route")
const login = require("./routes/login.route")
const logout = require("./routes/logout.route")
const videos = require("./routes/videos.route")
const comments = require("./routes/comments.route")
const authorize = require("./routes/authorize.route")
const createUser = require("./routes/createUser.route")

// 404 handler
const {routeNotFound} = require("./middleware/routeNotFound.middleware")

// routing
app.use("/",home)
app.use("/login",login)
app.use("/logout",logout)
app.use("/videos",videos)
app.use("/comments",comments)
app.use("/authorize",authorize)
app.use("/create-user",createUser)


/**
 * 404 Handler Don't Move it
 */

app.use(routeNotFound)

const PORT = 5000
app.listen(PORT,_ => console.log("server started on port: ",PORT))