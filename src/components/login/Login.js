import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authAction";
import { ToastContainer } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="center">
      <div className="background">
        <h1>Welcom to scanner </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, quae voluptatibus quibusdam quidem voluptas
        </p>
      </div>
      <div className="form-login">
        <h1>Login</h1>
        <form onSubmit={(e) => login(dispatch, e)}>
          <input type="text" name="email" placeholder="User Name Or Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
        </form>
        <Link to={"/signup"}>Create Account</Link>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
