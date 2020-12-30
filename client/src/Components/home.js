import React from "react";
import "../css/home.css"
import lo1 from "../photos/speech.png"

function Home() {
  return (
    <div className="navigation">
      <img alt=""  className="lo1" src={lo1} />
      <div className="brand">
        <a href="./">Matcha</a>
      </div>
      <nav>
        <div className="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
        <ul className="nav-list">
          <li>
            <a href="./">Home    </a>
          </li>
          <li>
            <a href="./about">About   </a>
          </li>
          <li>
            <a href="./login">Login   </a>
          </li>
          <li>
            <a href="./register">Register</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Home;
