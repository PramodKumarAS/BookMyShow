const express=require("express");
const userModel = require("../Model/users")
const userRouter =  express.Router();
const bcrypt = require("bcrypt");

userRouter.post('/register',async(req,res)=>{
    try {
        const userDetail = req.body;
        const hashedPassword =await hashPassword(userDetail.password);

        const user =  new userModel(userDetail);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Registration is successfull",
        });
    } catch (error) {
        res.status(500).json({
            success:false, 
            message:"Internal server error",
        })        
    }
});

userRouter.post('/login',async (req,res)=>{

    try {       
        const userDetail = req.body;
    
        const user = await userModel.findOne({email:userDetail.email});
        
        if(!user){
            return res.status(404).json({ success: false, message: "No user found" });
        }
        
        const isPasswordValid =await verifyPassword(req.body.password,user.password);
        if (!isPasswordValid) {
            return res.status(404).send({ 
                success: false, 
                message: "No user/pass combo found" 
            });
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

async function hashPassword(password) {
    const saltRounds=10;
    return await bcrypt.hash(password,saltRounds);
}

async function verifyPassword(password,hash) {
    return await bcrypt.compare(password,hash)
}

module.exports=userRouter;