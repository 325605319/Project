import { createSlice } from "@reduxjs/toolkit"
import { UseDispatch, useDispatch } from "react-redux"
const authSlice = createSlice({
    
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        newUser: localStorage.getItem("newUser") || "",
        userId: localStorage.getItem("userId") || "",
        userName: localStorage.getItem("userName") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false,
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            state.token = token
            const newUser = action.payload.newUser
            state.newUser = newUser
            const userId = action.payload.userId
            state.userId = userId
            const userName = action.payload.userName
            state.userName = userName
            state.isUserLoggedIn = true
            
            localStorage.setItem("token", token)
            localStorage.setItem("newUser", newUser)
            localStorage.setItem("userId", userId)
            localStorage.setItem("userName", userName)
            
        },

        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
            localStorage.removeItem("newUser")
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
        }
    }

})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions
