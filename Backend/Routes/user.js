const express=require("express");
const userModel = require("../Model/users")
const router =  express.Router();

router.post('/login',async (req,res)=>{

    try {       
        const userDetail = req.body;
    
        const user = await userModel.findOne({email:userDetail.email});
    
        if(!user){
            return res.status(404).json({ success: false, message: "No user found" });
        }
    
        res.status(200).json({
            success:true,
            message: "Successfully logged in!",
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message:error.message || "Internal Server Error!!",
        });
    }
});

module.exports=router;