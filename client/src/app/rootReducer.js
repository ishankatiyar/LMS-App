import authReducer from "../features/authSlice.js"
import { combineReducers } from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi"
import { courseApi } from "@/features/api/courseApi.js";


const rootReducer = combineReducers( {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth: authReducer

});

export default rootReducer;
