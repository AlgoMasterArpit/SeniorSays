// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            //  Payload seedha Appwrite ka user object hota hai (account.get() ka result) —
            //  { $id, name, email, ... }. Teeno dispatch sites (App, Login, Signup) yahi
            //  bhejte hain, aur consumers userData.$id padhte hain.
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
