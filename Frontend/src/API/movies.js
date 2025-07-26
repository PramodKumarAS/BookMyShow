import { axiosInstance } from "./axios";

const getAllMovies = async(value)=>{
    try {
        const movies = await axiosInstance.get('/api/movie/get-all-movies',value);
        return movies.data;
    } catch (error) {
        throw error;
    }
};

export{
    getAllMovies
}