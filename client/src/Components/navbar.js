import React from "react";
// import {a} from "react-router-dom";
import "../css/navbar.css"
import lo1 from "../photos/speech.png"

function Navbar() {
  return (
      <div className="navigation">
        <a href="/" ><img alt="" className="lo1" src={lo1} /></a>
        
        <div className="brand">
          <a className="text-s" href="/">Matcha</a>
        </div>
        <nav>
          <div className="nav-mobile"><a id="nav-hrefggle" href="#!"><span></span></a></div>
          <ul className="nav-list">
            <li>
              <a className="text-s" href="/about">About</a>
            </li>
            <li>
              <a  className="text-s" href="/login">Login</a>
            </li>
            <li>
              <button className="navbtn"><a className="text-sz"  href="/register">Register</a></button>
            </li>
          </ul>
        </nav>
      </div>
  );
}
export default Navbar;
