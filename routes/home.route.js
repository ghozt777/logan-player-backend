const express = require("express")
const router = express.Router()

router.route('/')
.get((req,res) => {
    return res.status(200).send(`
    <h1>A OK Bruh !</h1>
    <a href="http://localhost:5000/"><button style="
                    border-style: none;
                    padding: 1rem;
                    background-color: #1F2937;
                    color: white;
                    box-shadow: 0 8px 6px -2px #DDD6FE; 
                    min-height: 50px;
                    min-width: 70px;
                    border-radius: 0.5rem;
                    cursor: pointer;
                "> Home </button></a>
    `)
})

module.exports = router