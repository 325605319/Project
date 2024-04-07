import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1593/',
        credentials:'include',
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
            const newUser=getState().auth.newUser
            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            if(newUser){
                headers.set("newUser",newUser)
            }
            return headers
        }
    }),

    endpoints:()=>({})
})

export default apiSlice