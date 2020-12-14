import React from "react";
import error from "../photos/404.png";
import "./error.css";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "react-feather";

function Error() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <div className="div">
      <img alt="" className="error" src={error} />
      <h1>Oops.. Looks Like You Got Lost :(</h1>
      <br /> <br />
      <button className="bth" onClick={routeChange}>
       Back To Home
        <ArrowRight style={{     marginLeft: 10, display:"flex" ,float: "right", marginTop: 1}} size={30} />
      </button>
    </div>
  );
}
export default Error;
