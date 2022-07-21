import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
const reducer = {
  auth: authSlice,
  cart: cartSlice,
  product: productSlice,
  category: categorySlice,
  users: userSlice,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
