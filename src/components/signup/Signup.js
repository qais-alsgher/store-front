import React from "react";
import "./signup.css";
import "../login/login.css";
import { signup } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="center">
      <div className="background">
        <h1>Welcom to cartStore </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, quae voluptatibus quibusdam quidem voluptas
        </p>
      </div>
      <div className="form-login">
        <h1>Signup</h1>
        <form onSubmit={(e) => signup(dispatch, e)}>
          <input type="text" name="userName" placeholder="User Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="phone" placeholder="Phone" />
          <input type="password" name="password" placeholder="Password" />
          <select name="location" id="location">
            <option value="0" disabled selected>
              Select Location
            </option>
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Irbid">Irbid</option>
            <option value="Aqaba">Aqaba</option>
            <option value="Madaba">Madaba</option>
            <option value="Jerash">Jerash</option>
            <option value="Maan">Maan</option>
            <option value="Ajloun">Ajloun</option>
            <option value="Karak">Karak</option>
            <option value="Tafila">Tafila</option>
            <option value="Mafraq">Mafraq</option>
            <option value="Balqa">Balqa</option>
          </select>
          <button type="submit">
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
