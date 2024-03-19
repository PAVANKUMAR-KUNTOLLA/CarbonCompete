import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/produtsSlice"
//-----------------------|| REDUX - MAIN STORE ||-----------------------//


export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});