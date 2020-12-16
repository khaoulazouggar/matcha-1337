import React, { useState } from "react";
import "../css/login.css";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
import isEmpty from "./isEmpty";

function Login() {
  const [username, setusername] = useState("");
  const [errusername, setErrusername] = useState("");
  const [password, setpassword] = useState("");
  const [errpassword, setErrpassword] = useState("");
  const hadnleLogin = () => {
    setErrusername("");
    if (isEmpty(username)) {
      setErrusername("User name should not be empty");
    }
    setErrpassword("");
    if (isEmpty(password)) {
      setErrpassword("Password should not be empty");
    }
  };
  return (
    <div>
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Find Your Perfect Match</h1>
            <br />
            <p>
              We are here to build emotion, connect people and create happy stories. Online dating
              sites are the way to go for people seeking love.
            </p>

            <span>
              <p>Login with your social network</p>
              <br />
              <button className="media">
                <img alt="" src={fb} />
                Sign In With Facebook
              </button>
              <button className="media">
                <img alt="" src={google} />
              </button>
            </span>
          </div>
        </div>
        <div className="right">
          <h5>Login</h5>
          <p>
            Don't have an account? <a href="./register">Creat Your Account</a> it takes less than a
            minute
          </p>
          <div className="inputs">
            <input className="inpt"
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
                console.log(username);
              }}
            />
            <span className="errors">{errusername}</span>
            <br />
            <input className="inpt"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                console.log(password);
              }}
            />
            <span className="errors">{errpassword}</span>
          </div>
          <br />
          <br />

          <div className="forget-password">
            <a href="./fgpass">forget password?</a>
          </div>
          <br />
          <button className="btn" onClick={() => hadnleLogin()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
