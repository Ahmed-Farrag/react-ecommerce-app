import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { productsReducer } from "./ProductsSlice";

// wating for reducer
export let store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
  },
});
