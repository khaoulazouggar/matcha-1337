import React from "react";
import world from "../photos/Online world (1).gif";
import { useHistory } from "react-router-dom";
import "./about.css";

function About() {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = "./register"; 
    history.push(path);
  }
  return (
    <div>
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Get to Know More</h1>
            <br />
            <h2>About us</h2>
            <br />
            <br />
            <p>
              We are here to build emotion, connect people and create happy stories.Online dating
              sites are the way to go for people seeking love or to meet singles while they don’t
              know where to find them. There are lots of online dating sites available which makes
              it .
            </p>
            <br />
            <p>
              As a result, the customer service desk recommends that customers should consider
              contacting them via their website. We realize that it’s not a simple task to
              understand what options you have when it comes to contact with their help desk. We,
              therefore, find it helpful if we share some of our research work with you.
            </p>
          </div>
        </div>

        <div className="right">
          <h1>Best Ways to Find Your True Sole Mate</h1>
          <br />
          <br />
          <div>
            <img className="im" src={world} />
          </div>

          <div>
            <button className="btn" onClick={routeChange}>Join Now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
