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
            // Make sure we're storing the userData correctly
            state.userData = action.payload;
            console.log("Auth state updated:", { status: state.status, userData: state.userData });
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            console.log("User logged out, auth state reset");
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;