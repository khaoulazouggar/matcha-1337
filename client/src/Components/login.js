import React, { useState } from "react";
import "./login.css";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
// import _ from "lodash";
import isEmpty from "./isEmpty";

function Login() {
  const [username, setusername] = useState("");
  const [errusername, setErrusername] = useState("");
  const [password, setpassword] = useState("");
  const [errpassword, setErrpassword] = useState("");
  // const [show, setShow] = useState(false);
  // const handleShow = () => {
  //   setShow(!show);
  // };
  const hadnleLogin = () => {
    setErrusername("");
    if (isEmpty(username)) {
      setErrusername("this field should not be empty");
    }
    setErrpassword("");
    if (isEmpty(password)) {
      setErrpassword("this field should not be empty");
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
                Sign Up With Facebook
              </button>
              <button className="media">
                <img alt="" src={google} />
              </button>
            </span>
          </div>
        </div>
        {/* {show === true ? (
          <div className="right">
            <h5>Register</h5>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => handleShow()}>
                Log in
              </a>
            </p>
            <div className="inputs">
              <input type="text" placeholder="First name" />
              <br />
              <input type="text" placeholder="Last name" />
              <br />
              <input type="text" placeholder="User name" />
              <br />
              <input type="email" placeholder="Email" />
              <br />
              <input type="password" placeholder="Password" />
              <br />
              <input type="password" placeholder="Verify Password" />
            </div>
            <br />
            <br />
            <button className="login">Register</button>
          </div>
        ) : ( */}
        <div className="right">
          <h5>Login</h5>
          <p>
            Don't have an account? <a href="./register">Creat Your Account</a> it takes less than a
            minute
          </p>
          <div className="inputs">
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
                console.log(username);
              }}
            />
             <span style={{ color: "red" }}>{errusername}</span>
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                console.log(password);
              }}
            />
            <span style={{ color: "red" }}>{errpassword}</span>
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
        {/* )} */}
      </div>
    </div>
  );
}
export default Login;
