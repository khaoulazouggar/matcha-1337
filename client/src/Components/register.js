import React, { useState } from "react";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
// import isEmty from "./isEmpty";
import Axios from "axios"
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

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


  const history = useHistory();
  const routeChange = () => {
    let path = "/login";
    history.push(path);
  };
  const handelRegister = () => {
    let i = 0
    seterrusername("");
    if (!(username)) {
      i = 1;
      seterrusername("User name should not be empty");
    }

    seterrfirstname("");
    if (!(firstname)) {i = 1; seterrfirstname("First name should not be empty");}

    seterrlastname("");
    if (!(lastname)) {i = 1; seterrlastname("Last name should not be empty");}

    seterremail("");
    if (!(email)) {i = 1; seterremail("Email should not be empty");}

    seterrpassword("");
    if (!(password)) {i = 1; seterrpassword("Password should not be empty");}

    seterrverifypassword("");
    if (!(verifypassword)) {i = 1; seterrverifypassword("Verify Password should not be empty");}

    if (username && firstname && lastname && email && password && verifypassword) {
      Axios.post('http://localhost:3001/register', { firstname: firstname, lastname: lastname, username: username, email: email, password: password })
    }
    return i !== 0 ? false : true
  };

  return (
    <div>
      <div className="box-form">
        <div className="left-register">
          <div className="overlay">
            <h1>Find Your Perfect Match</h1>
            <br />
            <p>We are here to build emotion, connect people and create happy stories. Online dating sites are the way to go for people seeking love.</p>

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
              className="inpt"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
            <span className="errors">{errfirstname}</span>
            <br />
            <input
              className="inpt"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
            />
            <span className="errors">{errlastname}</span> <br />
            <input
              className="inpt"
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <span className="errors">{errusername}</span>
            <br />
            <input
              className="inpt"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <span className="errors">{erremail}</span>
            <br />
            <input
              className="inpt"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <span className="errors">{errpassword}</span> <br />
            <input
              className="inpt"
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
          <button className="btn" onClick={() => handelRegister() ? (Swal.fire({ icon: "success", text: "You Are Now Registered Please Check Your Email To Confirm Your Account! ", showConfirmButton: false, }), routeChange()) : ""}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
