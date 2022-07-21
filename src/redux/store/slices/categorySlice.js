import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    productsbyCat: {},
    loading: false,
  },
  reducers: {
    requestCats: (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    getCategories: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.productItems = action.payload;
      }
    },
    getItemsByCategory: (state, action) => {
      console.log("state", action.payload);
      if (state.loading === true) {
        state.loading = false;
        state.productsbyCat[action.payload[0]] = action.payload[1];
      }
    },
  },
});

// Destructure and export the plain action creators
export const { requestCats, getCategories, getItemsByCategory } =
  categorySlice.actions;

export const getCategoriesAsync = () => async (dispatch) => {
  try {
    dispatch(requestCats());
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    dispatch(getCategories(res.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const getItemsByCategoryAsync = (cat) => async (dispatch) => {
  try {
    dispatch(requestCats());
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${cat}`
    );
    console.log("your produdcts by ", cat, "are: ", res.data);

    dispatch(getItemsByCategory([cat, res.data]));
    localStorage.setItem(cat, JSON.stringify(res?.data));
    console.log("done");
  } catch (err) {
    throw new Error(err);
  }
};

export default categorySlice.reducer;
