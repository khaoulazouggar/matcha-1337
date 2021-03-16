import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../../css/changepass-confirm.css";
import Users from "../../services/Users";

function Confim(props) {
  const history = useHistory();
  const [validtoken, setValidToken] = useState(0);

  useEffect(() => {
    if (validtoken === 0 && props.match.params.token)
      Users.checktokenpass(props.match.params.token).then((res) => {
        if (res === "1") setValidToken(1);
        else history.push("/error");
      });

    const token = props.match.params.token;
    Axios.post("http://localhost:3001/confirm", { token: token }).then((res) => {
      // console.log(res.data.message);
      if (res.data.message !== "Verified") {
        history.push("/error");
      }
    });
  });

  return (
    <div className="box-form">
      <div className="left" id="left-confirm">
        <div className="overlay"></div>
      </div>
      <div className="right-confirm">
        <h1 className="fgp">Account Verified!</h1>
        <br />
        <br />
        <p>Your account has been successfully verified. You my now login.</p>
        <br />
        <br />
        <button className="btn" onClick={() => history.push("/login")}>
          Login !
        </button>
      </div>
    </div>
  );
}
export default Confim;
