import React, { useEffect } from "react";
import Axios from "axios";

function Confim(props) {
  useEffect(() => {
    console.log(props.match.params.token);
    const token = props.match.params.token;
    Axios.post("http://localhost:3001/confirm", { token: token }).then((res) => {
      console.log(res.data);
    });
  });

  return (
    <>
      <div>Your account has been successfully verified. You my now login.</div>
    </>
  );
}
export default Confim;
