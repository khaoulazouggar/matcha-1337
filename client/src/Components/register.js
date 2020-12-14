import React from "react";
// import "./login.css";
import fb from "../photos/fb.png";
import google from "../photos/google.png";

function Register() {
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

        <div className="right">
          <h5>Register</h5>
          <p>
            Already have an account?{" "}
            <a href="./login">
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
          <button className="btn">Register</button>
        </div>
      </div>
    </div>
  );
}
export default Register;
