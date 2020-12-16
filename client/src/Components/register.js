import React, { useState } from "react";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
import isEmty from "./isEmpty";

function Register() {
  const [username, setusername] = useState('')
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
    if (isEmty(username)) seterrusername("User name should not be empty");

    seterrfirstname("");
    if (isEmty(firstname)) seterrfirstname("First name should not be empty");

    seterrlastname("");
    if (isEmty(lastname)) seterrlastname("Last name should not be empty");

    seterremail("");
    if (isEmty(email)) seterremail("Email should not be empty");

    seterrpassword("");
    if (isEmty(password)) seterrpassword("Password should not be empty");

    seterrverifypassword("");
    if (isEmty(verifypassword)) seterrverifypassword("Verify Password should not be empty");
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
            <input className="inpt"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
            <span className="errors">{errfirstname}</span>
            <br />
            <input className="inpt"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
            />
            <span className="errors">{errlastname}</span> <br />
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <span className="errors">{erremail}</span>
            <br />
            <input className="inpt"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <span className="errors">{errpassword}</span> <br />
            <input className="inpt"
              type="password"
              placeholder="Verify Password"
              value={verifypassword}
              onChange={(e) => {
                setverifypassword(e.target.value);
              }}
            />
            <span className="errors">{errverifypassword}</span>
          </div>
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
