import React, { useState } from "react";
import { LoginAPI, GoogleAPI } from "../API/AuthAPI";
import ConnectLogo from "../assets/ConnectLogo.png";
import GoogleButton from "react-google-button";
import "../Scss/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const [credentails, setCredentials] = useState({});

  let navigate = useNavigate();

  const login = async () => {
    try {
      let response = await LoginAPI(credentails.email, credentails.password);
      toast.success("Login Successfully");
      // console.log(response);
      localStorage.setItem("userEmail", response.user.email);
      navigate("/home");
    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };
  const googleLogin = () => {
    try {
      let response = GoogleAPI();
      // console.log("Google Response : ", response);
      // toast.success("Login Successfully");
    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className='login-wrapper'>
      <img src={ConnectLogo} className='connectLogo' />

      <div className='login-wrapper-inner'>
        <h1 className='heading'>Log In</h1>
        <p className='sub-heading'>Welcome to Connect</p>

        <div className='auth-input'>
          <input
            onChange={(e) =>
              setCredentials({ ...credentails, email: e.target.value })
            }
            type='email'
            className='common-input'
            placeholder='Email or Phone'
          />

          <input
            onChange={(e) =>
              setCredentials({ ...credentails, password: e.target.value })
            }
            type='password'
            className='common-input'
            placeholder='Enter your Password'
          />
        </div>

        <button className='login-btn' onClick={login}>
          Log In
        </button>
      </div>
      <hr className='hr-text' data-content='or' />
      <div className='google-btn-container'>
        <GoogleButton className='google-btn' onClick={googleLogin} />
        <p className='signup-link'>
          Don't have an account?{" "}
          <span className='register' onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
