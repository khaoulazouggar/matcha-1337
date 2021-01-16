import React, { useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../../css/changepass-confirm.css";

function Confim(props) {
  const history = useHistory();
  useEffect(() => {
    console.log(props.match.params.token);
    const token = props.match.params.token;
    Axios.post("http://localhost:3001/confirm", { token: token }).then((res) => {
      if (res.data.message !== "Verified") { 
        history.push("/error");
      } 
    });
  });

  return (
      <div className="box-form">
        <div className="left-confirm"></div>
        <div className="right">
          <h1>Account Verified!</h1>
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
