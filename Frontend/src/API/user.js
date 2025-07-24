import { axiosInstance } from "./axios";

const loginUser = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/user/login',value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export{
    loginUser
}