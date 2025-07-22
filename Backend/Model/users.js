const mongoose = require("mongoose");

const userSchemaRules = {
    name :{
        type : String,
        require:true
    },
    email :{
        type : String,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    phoneNumber:{
        type:String,
        require:true
    }
};

const userSchema = new mongoose.Schema(userSchemaRules);
const userModel  = mongoose.model("users",userSchema);

module.exports=userModel;