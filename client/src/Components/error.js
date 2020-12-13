import React from "react";
import error from "../photos/404.png";
import "./error.css";
import { useHistory } from "react-router-dom";
import arrow from "../photos/right-arrow.png";
import { ArrowRight } from "react-feather";

function Error() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <div className="div">
      <img className="error" src={error} />
      <h1>Oops.. Looks Like You Got Lost :(</h1>
      <br /> <br />
      <button className="bth" onClick={routeChange}>
       Back To Home
        <ArrowRight /*style={{ marginTop: 5 }}*/ size={20} />
      </button>
    </div>
  );
}
export default Error;
