const express = require("express");
const theatreModels = require("../Model/theatre");
const authMiddleware = require("../Middleware/authMiddleware");
const theatreRouter = express.Router();

theatreRouter.post('/add-theatre',authMiddleware, async(req,res)=>{
    try {
        const theatreDetails = req.body;

        const theatre = new theatreModels(theatreDetails);
        await theatre.save();

        res.status(200).json({
            success: true,
            message: "Theatre Added!", 
            theatre
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
});

theatreRouter.get('/get-all-theatre',authMiddleware, async(req,res)=>{
    try {
        const allTheatres =await theatreModels.find().populate("owner");
        console.log("Theate",allTheatres)
        res.status(200).json({
            success: true,
            message: "Theatre fetched!", 
            allTheatres
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
});

theatreRouter.post('/update-theatre',authMiddleware,async(req,res)=>{
    try {
      const updatedTheatre=await theatreModels.findByIdAndUpdate(req.body._id,req.body,{new:true});

      res.status(200).json({
            success: true,
            message: "Theatre updated!", 
            updatedTheatre
      });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })        
    }
});

module.exports=theatreRouter