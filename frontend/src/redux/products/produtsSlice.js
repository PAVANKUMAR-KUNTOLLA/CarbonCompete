import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      const products = action.payload;
      state.products = products;
    },
  
  },
});
export const {
  setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
