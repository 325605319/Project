import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSlice from "../features/auth/authSlice"
import slice from "./slice"

const store=configureStore({
    reducer:{
        slice,
        auth:authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store