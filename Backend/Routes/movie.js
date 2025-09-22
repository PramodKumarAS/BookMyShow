const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const movieModels = require("../Model/movies");
const movieRouter = express.Router();

movieRouter.post('/add-movie',authMiddleware,async(req,res)=>{
    try {
        const movieDetails=req.body;

        const movie = new movieModels(movieDetails);
        await movie.save();
        
        res.status(200).json({
            success:true,
            message:"Movie is added",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
});

movieRouter.post('/update-movie',authMiddleware,async(req,res)=>{
    try {
       const updatedMovie = await movieModels.findOneAndUpdate({_id:req.body.movieId},req.body,{new:true});
              
        res.status(200).json({
            updatedMovie,
            success:true,
            message:"Movie is updated",
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
});

movieRouter.post('/delete-movie',authMiddleware,async(req,res)=>{
    try {
       await movieModels.findByIdAndDelete(req.body._id);
              
        res.status(200).json({
            success:true,
            message:"Movie is deleted",
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
});

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

movieRouter.get('/:id',authMiddleware, async(req,res)=>{
    try {
        const movie = await movieModels.findById(req.params.id);

        res.send({
            success: true,
            message: "Movies fetched!",
            movie
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })        
    }
});

module.exports = movieRouter;