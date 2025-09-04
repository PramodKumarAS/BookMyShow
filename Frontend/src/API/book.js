import { axiosInstance } from "./axios";

// This is the API where I need to confrm my payment which has been started from frontend
export const makePayment = async (token, amount) => {
    try{
        const response = await axiosInstance.post('/api/book/make-payment', {token, amount});
        return response.data;
    }catch(err){
        return err.response
    }
}

export const bookShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/book/book-show', payload);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const getAllBookings = async () => {
    try{
        const response = await axiosInstance.get('/api/book/get-all-bookings');
        return response.data;
    }catch(err){
        return err.response;
    }
}