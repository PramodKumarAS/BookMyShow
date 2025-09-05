import { axiosInstance } from "./axios";

const registerUser = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/user/register',value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const loginUser = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/user/login',value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async(value)=>{
    try {
        const response = await axiosInstance.get('/api/user/get-currentUser',value);
        return response.data;
    } catch (error) {
        console.log("ohh yea",error)
        throw error;
    }
};

const forgetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/forgetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const resetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/resetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export{
    registerUser,
    loginUser,
    getCurrentUser,
    forgetPassword,
    resetPassword
}