import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from './loaderSlice'
import userSlice from './userSlice'

const store=configureStore({
    reducer:{
        loaders:loaderSlice,
        users:userSlice,
    }
})  

export default store;