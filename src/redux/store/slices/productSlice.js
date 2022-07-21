import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productItems: localStorage.getItem("productItems")
      ? JSON.parse(localStorage.getItem("productItems"))
      : [],
    product: null,
    loading: false,
  },
  reducers: {
    requestItems: (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    successItems: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
      }
    },
    getItems: (state, action) => {
      // state.productItems = action.payload;
      console.log("state in productSlice", state.product);

      if (state.productItems) {
        state.loading = false;
        state.productItems = action.payload;
      }
    },
    getItemById: (state, action) => {
      // if (state.loading === true) {
      state.loading = false;
      console.log(action.payload);
      state.product = action.payload;
      // }
      // state.product = action.payload;
    },
    addItem: (state, action) => {
      // if (state.loading === true) {
      state.loading = false;
      state.productItems.push(action.payload);
      // }
    },
  },
});

// Destructure and export the plain action creators
export const { requestItems, getItems, getItemById, addItem, successItems } =
  productSlice.actions;

export const getItemsAsync = () => async (dispatch) => {
  try {
    let prod = localStorage.getItem("productItems");

    if (!prod) {
      dispatch(requestItems());
      const res = await axios.get("https://fakestoreapi.com/products");
      dispatch(getItems(res.data));
      localStorage.setItem("productItems", JSON.stringify(res?.data));
      dispatch(successItems());
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getItemDetailsAsync = (id) => async (dispatch) => {
  try {
    dispatch(requestItems());
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log("url", `https://fakestoreapi.com/products/${id}`);

    console.log("your data by id", res.data);
    dispatch(getItemById(res.data));
    dispatch(successItems());
  } catch (err) {
    throw new Error(err);
  }
};

export const addItemAsync = (obj) => async (dispatch) => {
  try {
    dispatch(requestItems());
    const res = await axios.post("https://fakestoreapi.com/products", obj);
    console.log("added:", res.data);
    dispatch(addItem(res.data));
    dispatch(successItems());
  } catch (err) {
    throw new Error(err);
  }
};

export default productSlice.reducer;
