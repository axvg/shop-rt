import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    check: false,
    token: sessionStorage.getItem("storeToken")
      ? sessionStorage.getItem("storeToken")
      : null,
    isLogged: sessionStorage.getItem("isLogged")
      ? sessionStorage.getItem("isLogged")
      : false,
    error: null,
    isAdmin: sessionStorage.getItem(false)
      ? sessionStorage.getItem(false)
      : false,
  },
  reducers: {
    request: (state, action) => {
      if (state.check === false) {
        state.check = true;
      }
    },
    success: (state, action) => {
      if (state.check === true) {
        state.check = false;
      }
    },
    login: (state, action) => {
      state.token = action.payload;
      // console.log("status after login: ", state.isLogged);
    },
    logout: (state, action) => {
      state.token = null;
      state.isLogged = false;
      // console.log("status after logout: ", state.isLogged);
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLogged = false;
      state.check = false;
    },
  },
});

export const { request, error, success } = authSlice.actions;

export const loginAsync = (username, password) => async (dispatch) => {
  try {
    dispatch(request());
    const res = await axios.post("https://fakestoreapi.com/auth/login", {
      username: username,
      password: password,
    });
    // sessionStorage.setItem('storeToken', res.data.token);
    // sessionStorage.setItem(
    //     'storeUser',
    //     JSON.stringify({ username: loginData.username })
    // );
    // dispatch(request(false));
    sessionStorage.setItem("storeToken", res?.data.token);
    sessionStorage.setItem("isLogged", true);

    dispatch(login(res?.data.token));
    dispatch(success());
    // console.log("token", res.data);
  } catch (err) {
    dispatch(request());
    dispatch(error(err.response.data ? err.response.data : err.message));
    dispatch(success());
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(logout());
    sessionStorage.removeItem("storeToken");
    sessionStorage.setItem("isLogged", false);
    sessionStorage.clear();
    // sessionStorage.removeItem('storeUser');
  } catch (err) {
    dispatch(request());
    dispatch(error(err?.response.data));
    dispatch(success());
  }
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
// export const authSelector = (state) => state.user;
