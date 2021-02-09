import React from "react";
import {NavLink} from "react-router-dom";
import "../css/navbar.css"
import lo1 from "../photos/speech.png"

function Navbar() {
  return (
      <div className="navigation">
        <img alt="" className="lo1" src={lo1} />
        <div className="brand">
          <NavLink exact className="text-sz" to="/">Matcha</NavLink>
        </div>
        <nav>
          <div className="nav-mobile"><NavLink id="nav-toggle" to="#!"><span></span></NavLink></div>
          <ul className="nav-list">
            <li>
              <NavLink className="text-sz" to="/about">About</NavLink>
            </li>
            <li>
              <NavLink  className="text-sz" to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink  className="text-sz" to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
  );
}
export default Navbar;
