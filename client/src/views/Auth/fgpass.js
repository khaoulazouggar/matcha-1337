import React, { useState, useEffect } from "react";
import isEmail from "../../tools/isEmail";
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory, Link } from "react-router-dom";

function Fgpass() {
  const [email, setemail] = useState("");
  const [erremail, seterremail] = useState("");
  const history = useHistory();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) history.push("/");
    // eslint-disable-next-line
  }, [token]);

  const handleFgpass = () => {
    seterremail("");
    if (!email) seterremail("Email should not be empty");
    else if (!isEmail(email)) seterremail("Email is not valide");
    else if (email && !erremail) {
      Axios.post("http://localhost:3001/fgpass", { email: email }).then((res) => {
        if (res.data.message === "done") {
          Swal.fire({
            icon: "success",
            text: " Email Send Please Check Your EmailBox To Change Your Password!",
            showConfirmButton: false,
            heightAuto: false,
          });
          history.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            text: " Email Not Found",
            showConfirmButton: false,
            heightAuto: false,
          });
        }
      });
    }
  };
  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1 className="fgp">Forgotten Your Password?</h1>

          <p>
            For security reasons, we do NOT store your password. So rest assured that we will never send your password
            via email.
          </p>
        </div>
      </div>

      <div className="right-fgp">
        <br />
        <br />
        <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        <div className="inputs">
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
        </div>
        <br />
        <br />

        <button className="btn" onClick={() => handleFgpass()}>
          Send Reset Instructions
        </button>
        <br />
        <br />
        <br />
        <br />
        <p>
          Just remembered?{" "}
          <Link className="decoration" to="./login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Fgpass;
