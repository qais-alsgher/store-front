import axios from "axios";

import {
  authRequest,
  authFail,
  loginSuccess,
  signupSuccess,
  logoutSuccess,
} from "../features/authSlicer";
import base64 from "base-64";
import { toast } from "react-toastify";

export const login = (dispatch, payload) => {
  payload.preventDefault();
  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };
  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());
      axios
        .post(
          "http://localhost:8080/login",
          {},
          {
            headers: {
              Authorization: `Basic ${encodedUser}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("username", res.data.userName);
          localStorage.setItem("userID", res.data.id);
          toast.success(`Welcome ${res.data.userName} to cartStore`);
        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
          toast.error(err.response.data);
        });
    }
  } catch (err) {
    dispatch(authFail(err.response.data));
    toast.error(err.response.data);
  }
};

export const signup = (dispatch, payload) => {
  try {
    payload.preventDefault();
    const userInfo = {
      userName: payload.target.userName.value,
      email: payload.target.email.value,
      password: payload.target.password.value,
      PhoneNumber: payload.target.phone.value,
      userAddress: payload.target.location.value,
    };
    console.log(userInfo);
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());
      axios
        .post("http://localhost:8080/signup", userInfo)
        .then((res) => {
          console.log(res.data);
          dispatch(signupSuccess(res.data));
          toast.success(`Welcome ${res.data.userName} to cartStore`);
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch(authFail(err.response.data));
          toast.error(err.response.data);
        });
    }
  } catch (err) {
    dispatch(authFail(err.response.data));
    toast.error(err.response.data);
  }
};

export const logout = (dispatch) => {
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
  } catch (error) {
    dispatch(authFail(error));
  }
};
