import { axiosInstance } from "./axios";

const addMovie =async(value)=>{
    try {
        const movie = await axiosInstance.post('/api/movie/add-movie',value);
        return movie.data;
    } catch (error) {
        throw error;
    }
};

const updateMovie =async(value)=>{
    try {
        const movie = await axiosInstance.post('/api/movie/update-movie',value);
        return movie.data;
    } catch (error) {
        throw error;
    }
};

const deleteMovie =async(value)=>{
    try {
        const movie = await axiosInstance.post('/api/movie/delete-movie',value);
        return movie.data;
    } catch (error) {
        throw error;
    }
};

const getAllMovies = async(value)=>{
    try {
        const movies = await axiosInstance.get('/api/movie/get-all-movies',value);
        return movies.data;
    } catch (error) {
        throw error;
    }
};

export{
    addMovie,
    updateMovie,   
    deleteMovie, 
    getAllMovies
}