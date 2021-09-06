function errorHandler(err,req,res,next) {
    console.error(err.stack)
    res.status(500).json({sucess:false,message:`error occured with message: ${err.message} `})
}

module.exports = {errorHandler}