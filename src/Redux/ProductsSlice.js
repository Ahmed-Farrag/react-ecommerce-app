import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { products: [], isLoading: false, cart: null };

export let getProducts = createAsyncThunk("products/getProducts", async () => {
  let { data } = await axios.get(
    `https://route-ecommerce.onrender.com/api/v1/products`
  );
  return data.data;
});

export let getcarts = createAsyncThunk("products/getCarts", async () => {
  let { data } = await axios.get(
    `https://route-ecommerce.onrender.com/api/v1/carts`
  );
  return data.data;
});

let productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    printProducts: (state) => {
      console.log(state.products);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("fullfiled", (state, action) => {
      state.products = action.payload;
      state.cart = action.payload;
    });
    builder.addCase("pending");
    builder.addCase("completed");
  },
});
export let productsReducer = productsSlice.reducer;
export let { printProducts } = productsSlice.actions;
