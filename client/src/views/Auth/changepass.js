import React, { useState } from "react";
import "../../css/changepass-confirm.css";
import isPassword from "../../tools/isPassword";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import Users from "../../services/Users";

function Changepass(props) {
  const history = useHistory();
  const [Npassword, setNpassword] = useState("");
  const [errNpassword, setErrNpassword] = useState("");
  const [Cnpassword, setCnpassword] = useState("");
  const [errCnpassword, setErrCnpassword] = useState("");
  const [validtoken, setValidToken] = useState(0);

  React.useEffect(() => {
    if (validtoken === 0 && props.match.params.token)
      Users.checktoken(props.match.params.token).then((res) => {
        if (res === "1") setValidToken(1);
        else history.push("/error");
      });

    if (Npassword && !isPassword(Npassword))
      setErrNpassword(
        "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    else setErrNpassword("");
    if (Cnpassword && Npassword !== Cnpassword) setErrCnpassword("Confirm Password is not valide");
    else setErrCnpassword("");
  }, [Npassword, Cnpassword, history, props.match.params.token, validtoken]);

  const handlePass = () => {
    // console.log(props.match.params.token);
    const token = props.match.params.token;

    if (!Npassword) {
      setErrNpassword("New password should not be empty");
    }

    if (!Cnpassword) {
      setErrCnpassword("Confirm new password should not be empty");
    }
    if (Npassword && Cnpassword && !errNpassword && !errCnpassword) {
      Axios.post("http://localhost:3001/changepass", { password: Npassword, token: token })
        .then((res) => {
          if (res.data.message === "modified") {
            Swal.fire({
              icon: "success",
              text: "Your password has been successfully modified.",
              showConfirmButton: false,
              heightAuto: false,
            });
            history.push("/login");
          }
        })
        .catch((err) => {
          // console.log(err)
        });
    }
  };

  return (
    <div className="box-form">
      <div className="left" id="left-pass">
        <div className="overlay"></div>
      </div>

      <div className="right">
        <h1 className="fgp">Reset Password !</h1>
        <br />
        <br />
        <p>Please Enter Your new Password :</p>
        <div className="inputs">
          <input
            className="inpt"
            type="password"
            placeholder="New Password"
            value={Npassword}
            onChange={(e) => {
              setNpassword(e.target.value);
            }}
          />
          <span className="errors">{errNpassword}</span>
          <input
            className="inpt"
            type="password"
            placeholder="Confirm New Password"
            value={Cnpassword}
            onChange={(e) => {
              setCnpassword(e.target.value);
            }}
          />
          <span className="errors">{errCnpassword}</span>
        </div>
        <br />
        <br />
        <button className="btn" onClick={() => handlePass()}>
          Change Password
        </button>
        <br />
        <br />
        <br />
        <p>
          Just remembered? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
export default Changepass;
