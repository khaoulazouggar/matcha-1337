import React, { useState } from "react";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
import isEmty from "./isEmpty";

function Register() {
  const [username, setusername] = useState("");
  const [errusername, seterrusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [errfirstname, seterrfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [errlastname, seterrlastname] = useState("");
  const [email, setemail] = useState("");
  const [erremail, seterremail] = useState("");
  const [password, setpassword] = useState("");
  const [errpassword, seterrpassword] = useState("");
  const [verifypassword, setverifypassword] = useState("");
  const [errverifypassword, seterrverifypassword] = useState("");

  const handelRegister = () => {
    seterrusername("");
    if (isEmty(username)) seterrusername("username should not be empty");

    seterrfirstname("");
    if (isEmty(firstname)) seterrfirstname("firstname should not be empty");

    seterrlastname("");
    if (isEmty(lastname)) seterrlastname("firstname should not be empty");

    seterremail("");
    if (isEmty(email)) seterremail("email should not be empty");

    seterrpassword("");
    if (isEmty(password)) seterrpassword("password should not be empty");

    seterrverifypassword("");
    if (isEmty(verifypassword)) seterrverifypassword("verifypassword should not be empty");
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

        <div className="right">
          <h5>Register</h5>
          <p>
            Already have an account? <a href="./login">Log in</a>
          </p>
          <div className="inputs">
            <input
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{errfirstname}</span>
            <br />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
            />
            <br />
            <span style={{ color: "red" }}>{errlastname}</span>
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <br />
            <span style={{ color: "red" }}>{errusername}</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <br />
            <span style={{ color: "red" }}>{erremail}</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <br />
            <span style={{ color: "red" }}>{errpassword}</span>
            <input
              type="password"
              placeholder="Verify Password"
              value={verifypassword}
              onChange={(e) => {
                setverifypassword(e.target.value);
              }}
            />
          </div>
          <sapn style={{ color: "red" }}>{errverifypassword}</sapn>
          <br />
          <br />
          <button className="btn" onClick={() => handelRegister()}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
