const mongoose = require("mongoose");

const movieSchemaRules ={
    movieName: {
        type: String, 
        required: true    
    },
    description: {
        type: String, 
        required: true    
    },
    duration: {
        type: Number, 
        required: true    
    },
    genre: {
        type: String, 
        required: true    
    },
    language: {
        type: String, 
        required: true    
    },
     releaseDate: {
        type: Date, 
       required: true    
     },
     poster: {
         type: String, 
         required: true
     }
};

const movieSchema = new mongoose.Schema(movieSchemaRules);
const movieModels = mongoose.model('movies',movieSchema);

module.exports=movieModels;