import React, { useState } from "react";
import fb from "../photos/fb.png";
import google from "../photos/google.png";
// import isEmty from "./isEmpty";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import isEmail from "../tools/isEmail";
import isUsername from "../tools/isUsername";
import isName from "../tools/isName";
import isPassword from "../tools/isPassword";
import _ from "lodash";

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
  const [success, setsuccess] = useState(false);

  const history = useHistory();
  const routeChange = () => {
    let path = "/login";
    history.push(path);
  };
  const handelRegister = () => {
    let i = 0;
    seterrusername("");
    if (!username) {
      i = 1;
      seterrusername("Username should not be empty");
      console.log(errusername);
    } else if (!isUsername(username)) seterrusername("Username is not valide");

    seterrfirstname("");
    if (!firstname) {
      i = 1;
      seterrfirstname("First name should not be empty");
    } else if (!isName(firstname)) seterrfirstname("first name is not valide");

    seterrlastname("");
    if (!lastname) {
      i = 1;
      seterrlastname("Last name should not be empty");
    } else if (!isName(lastname)) seterrlastname("Last Name is not valide");

    seterremail("");
    if (!email) {
      i = 1;
      seterremail("Email should not be empty");
    } else if (!isEmail(email)) seterremail("Email is not valide");

    seterrpassword("");
    if (!password) {
      i = 1;
      seterrpassword("Password should not be empty");
    } else if (!isPassword(password)) seterrpassword("Password is not valide");

    seterrverifypassword("");
    if (!verifypassword) {
      i = 1;
      seterrverifypassword("Verify Password should not be empty");
    } else if (password !== verifypassword) seterrverifypassword("Verify Password is not valide");
    //username && firstname && lastname && email && password && verifypassword &&
    else if (_.isEmpty(errusername)) {
      setsuccess(true);
      // Axios.post("http://localhost:3001/register", {
      //   firstname: firstname,
      //   lastname: lastname,
      //   username: username,
      //   email: email,
      //   password: password,
      // });
    }
  };

  return (
    <div>
      <div className="box-form">
        <div className="left-register">
          <div className="overlay">
            <h1>Find Your Perfect Match</h1>
            <br />
            <p>
              We are here to build emotion, connect people and create happy stories. Online dating sites are the way to go for people
              seeking love.
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
          <button className="btn" onClick={() => handelRegister()}>
            Register
          </button>
          {success
            ? (Swal.fire({
                icon: "success",
                text: "You Are Now Registered Please Check Your Email To Confirm Your Account! ",
                showConfirmButton: false,
              }),
              routeChange())
            : ""}
        </div>
      </div>
    </div>
  );
}
export default Register;
