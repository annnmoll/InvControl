import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading : false  };

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading : (state) => {
        state.loading = !state.loading 
     }
  }
});

export const {toggleLoading} = LoadingSlice.actions;
export const loading = (state) => state.loading.loading;
export default LoadingSlice.reducer;
