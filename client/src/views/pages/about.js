import React, { useState, useEffect } from "react";
import world from "../../photos/OnlineWorld.gif";
import { useHistory } from "react-router-dom";
import "../../css/about.css";

function About() {
  const history = useHistory();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) history.push("/");
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1 className="fgp">Get to Know More</h1>
          <br />
          <h2>About us</h2>
          <br />
          <br />
          <p>
            We are here to build emotion, connect people and create happy stories.Online dating
            sites are the way to go for people seeking love or to meet singles while they don’t know
            where to find them. There are lots of online dating sites available which makes it .
          </p>
          <br />
          <p>
            As a result, the customer service desk recommends that customers should consider
            contacting them via their website. We realize that it’s not a simple task to understand
            what options you have when it comes to contact with their help desk. We, therefore, find
            it helpful if we share some of our research work with you.
          </p>
        </div>
      </div>

      <div className="right">
        <h1 className="soulmate">Best Ways to Find Your True Soulmate</h1>
        <br />
        <br />
        <div>
          <img alt="" className="im" src={world} />
        </div>

        <div>
          <button className="btn" onClick={() => history.push("/register")}>
            Join Now!
          </button>
        </div>
      </div>
    </div>
  );
}
export default About;
