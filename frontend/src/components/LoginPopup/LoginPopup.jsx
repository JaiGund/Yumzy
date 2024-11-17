import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(storeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    } 

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      if (location.pathname === "/cart") {
        navigate("/order"); // Navigate to the order page if coming from the cart
      } else {
        // Stay on the same page (no navigation) if not from the cart
        navigate(location.pathname);
      }
    } else {
      alert(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            required
          />
        </div>
        <button type="sumbit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <></>
        )}
        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
