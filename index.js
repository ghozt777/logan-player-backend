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
const createUser = require("./routes/createUser.route")
const resetPassword = require("./routes/reset-password.route")

// 404 handler
const {routeNotFound} = require("./middleware/routeNotFound.middleware")

// Error Handler
const {errorHandler} = require("./middleware/errorHandler.middleware")

// routing
app.use("/",home)
app.use("/login",login)
app.use("/logout",logout)
app.use("/videos",videos)
app.use("/create-user",createUser)
app.use("/reset-password",resetPassword)


/**
 * 404 Handler Don't Move it
 */

app.use(routeNotFound)


/**
 * Error Handler Dont Move
 */
app.use(errorHandler)

const PORT = 5000
app.listen(PORT,_ => console.log("server started on port: ",PORT))