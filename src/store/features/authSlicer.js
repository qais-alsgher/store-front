import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  isAuth: token ? true : false,
  userInfo: userInfo,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      console.log(action.payload);
      state.userInfo = action.payload;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.userInfo = action.payload;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuth = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

export const {
  authRequest,
  authFail,
  loginSuccess,
  signupSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
