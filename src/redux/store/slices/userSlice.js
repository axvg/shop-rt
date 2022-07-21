import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    all: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    requestUser: (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    successUser: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
      }
    },
    getAllUsers: (state, action) => {
      // state.users = action.payload;
      // if (state.loading === true) {
      state.loading = false;
      state.users = action.payload;
      // }
    },
    getUserById: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.user = action.payload;
      }
    },
    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Destructure and export the plain action creators
export const { requestUser, successUser, getAllUsers, getUserById, error } =
  userSlice.actions;

export const getAllUsersAsync = () => async (dispatch) => {
  try {
    dispatch(requestUser());
    const res = await axios.get("https://fakestoreapi.com/users");
    console.log("all users", res.data);
    dispatch(getAllUsers(res.data));
    dispatch(successUser());
  } catch (err) {
    dispatch(requestUser());
    dispatch(error(err));
    dispatch(successUser());
  }
};

export const getUserByIdAsync = (id) => async (dispatch) => {
  try {
    dispatch(requestUser());
    const res = await axios.get(`https://fakestoreapi.com/users/${id}`);
    dispatch(getUserById(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(requestUser());
    dispatch(error(err));
    dispatch(successUser());
  }
};

export default userSlice.reducer;
