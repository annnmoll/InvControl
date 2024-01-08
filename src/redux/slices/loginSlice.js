import { createSlice } from "@reduxjs/toolkit";

const initialState = {  isLoggedIn : false };

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin : (state , action) => {
        state.isLoggedIn = action.payload
     } 
  }
});

export const {setLogin} = LoginSlice.actions;
export const isLoggedIn = (state) => state.login.isLoggedIn;
export default LoginSlice.reducer;
