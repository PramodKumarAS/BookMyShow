import { axiosInstance } from "./axios";

const addTheatre =  async(value)=>{
    try {
        const theatre =await axiosInstance.post('/api/theatre/add-theatre',value);
        return theatre.data;
    } catch (error) {
        throw error;
    }
};

const updateTheatre =  async(value)=>{
    try {
        const theatre =await axiosInstance.post('/api/theatre/update-theatre',value);
        return theatre.data;
    } catch (error) {
        throw error;
    }
};

const getAllTheatres =  async(value)=>{
    try {
        const theatre =await axiosInstance.get('/api/theatre/get-all-theatre',value);
        return theatre.data;
    } catch (error) {
        throw error;
    }
};

export {
    addTheatre,
    updateTheatre,
    getAllTheatres
}