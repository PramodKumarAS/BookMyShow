const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const movieModels = require("../Model/movies");
const movieRouter = express.Router();

movieRouter.get('/get-all-movies',authMiddleware, async(req,res)=>{
    try {
        const movies = await movieModels.find();

        res.send({
            success: true,
            message: "Movies fetched!",
            movies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })        
    }
});

module.exports = movieRouter;