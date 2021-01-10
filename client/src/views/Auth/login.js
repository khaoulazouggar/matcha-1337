import React, { useState } from "react";
import fb from "../../photos/fb.png";
import google from "../../photos/google.png";
// import isEmpty from "./isEmpty";
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [errusername, setErrusername] = useState("");
  const [password, setpassword] = useState("");
  const [errpassword, setErrpassword] = useState("");
  const history = useHistory();
  const routeChange = () => {
    let path = "/steps";
    history.push(path);
  };
  const hadnleLogin = () => {
    setErrusername("");
    if (!(username)) {
      setErrusername("User name should not be empty");
    }
    setErrpassword("");
    if (!(password)) {
      setErrpassword("Password should not be empty");
    }
    if (username && password) {
      Axios.post('http://localhost:3001/login', { username: username, password: password })
        .then((response) => { if (response.data.message) { Swal.fire({ icon: "error", text: "Wrong Username Or Password", showConfirmButton: false, }); } else { Swal.fire({ icon: "success", text: "You are now logged in ", showConfirmButton: false, }); routeChange();} })
    }
  };
  return (
  
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
  );
}
export default Login;
