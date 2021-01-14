import React, { useState } from "react";
import isEmail from "../../tools/isEmail"
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

// import isEmty from "./isEmpty";

function Fgpass() {
  const [email, setemail] = useState("");
  const [erremail, seterremail] = useState("");
  const history = useHistory();
  const routeChange = () => {
    let path = "/login";
    history.push(path);
  };
  const handleFgpass = () => {
    seterremail("");
    if (!(email)) seterremail("Email should not be empty");
    else if(!isEmail(email)) seterremail("Email is not valide");
    else if(email && !erremail){Axios.post("http://localhost:3001/fgpass",{email:email}).then((res)=> {if (res.data.message === "done") {
      Swal.fire({
        icon: "success",
        text: " Email Send Please Check Your EmailBox To Change Your Password!",
        showConfirmButton: false,
      });routeChange();
    }})}
  };
  return (
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Forgotten Your Password?</h1>

            <p>
              For security reasons, we do NOT store your password. So rest assured that we will
              never send your password via email.
            </p>
          </div>
        </div>

        <div className="right">
          <br />
          <br />
          <p>
            Enter the email address you used when you joined and we’ll send you instructions to
            reset your password.
          </p>
          <div className="inputs">
            <input className="inpt"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <span className="errors">{erremail}</span>
          </div>
          <br />
          <br />

          <button className="btn" onClick={() => handleFgpass()}>
            Send Reset Instructions
          </button>
          <br />
          <p>
            Just remembered? <a href="./login">Log in</a>
          </p>
        </div>
      </div>
  );
}

export default Fgpass;