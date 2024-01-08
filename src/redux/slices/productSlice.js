import { createSlice } from "@reduxjs/toolkit";

const initialState = { product : {}};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
        state.product = action.payload
     }
  }
});

export const { setSelectedProduct} = ProductSlice.actions;
export const selectedProduct = (state) => state.product;
export default ProductSlice.reducer;
