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
      // console.log("state in productSlice", state.product);

      if (state.productItems) {
        state.loading = false;
        state.productItems = action.payload;
      }
    },
    getItemById: (state, action) => {
      // if (state.loading === true) {
      state.loading = false;
      // console.log(action.payload);
      state.product = action.payload;
      // }
      // state.product = action.payload;
    },
    addItem: (state, action) => {
      const ids = state.productItems.map((el) => el.id);
      const newId = Math.max(...ids) + 1;
      const newItem = {
        ...action.payload,
        id: newId,
      };
      // console.log(newItem);
      state.loading = false;
      state.productItems.push(newItem);
      localStorage.setItem("productItems", JSON.stringify(state.productItems));
      // }
    },
    deleteItemfromStore: (state, action) => {
      // state.productItems.pop(action.payload);
      // let updatedArr = state.productItems;
      // updatedArr = updatedArr.filter((el) => el.id !== action.payload.id);
      // console.log("array before", updatedArr);
      // console.log(
      //   "array after",
      state.productItems = state.productItems.filter(
        (el) => el.id !== action.payload.id
      );
      // );
      localStorage.setItem("productItems", JSON.stringify(state.productItems));
    },
    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateItem: (state, action) => {
      const oldId = action.payload.id;
      console.log('oldId',oldId);
      deleteItemfromStore(oldId);
      const updatedItem = {
        ...action.payload,
        id: oldId,
      };
      state.productItems.push(updatedItem);
      localStorage.setItem("productItems", JSON.stringify(state.productItems));
    },
  },
});

// Destructure and export the plain action creators
export const {
  requestItems,
  getItems,
  getItemById,
  addItem,
  successItems,
  deleteItemfromStore,
  updateItem,
  error,
} = productSlice.actions;

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
    dispatch(requestItems());
    console.log("err", err);
    dispatch(error(err?.response.data));
    dispatch(successItems());
  }
};

export const getItemDetailsAsync = (id) => async (dispatch) => {
  try {
    // console.log("this id", id);

    let thisProd = JSON.parse(localStorage.getItem("productItems")).find(
      (el) => el.id === Number(id)
    );
    // console.log("thisProd", thisProd);

    if (thisProd && id < 21) {
      dispatch(requestItems());
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      // console.log("url", `https://fakestoreapi.com/products/${id}`);
      // console.log("your data by id", res.data);
      thisProd = res.data;
      dispatch(successItems());
    }
    dispatch(getItemById(thisProd));
  } catch (err) {
    dispatch(requestItems());
    dispatch(
      error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
    dispatch(successItems());
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
    dispatch(requestItems());
    dispatch(
      error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
    dispatch(successItems());
  }
};

export default productSlice.reducer;
