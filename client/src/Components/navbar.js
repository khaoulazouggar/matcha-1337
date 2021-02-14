import React from "react";
// import {a} from "react-router-dom";
import "../css/navbar.css"
import lo1 from "../photos/speech.png"
import { Link } from "react-router-dom";

function Navbar() {
  return (
      <div className="navigation">
        <Link to="/" ><img alt="" className="lo1" src={lo1} /></Link>
        
        <div className="brand">
          <Link className="text-s" to="/">Matcha</Link>
        </div>
        <nav>
          <div className="nav-mobile"><Link id="nav-hrefggle" to="#!"><span></span></Link></div>
          <ul className="nav-list">
            <li>
              <Link className="text-s" to={!localStorage.getItem('token')? "/about":"/edit"}>{!localStorage.getItem('token')? "About": "Edit"}</Link>
            </li>
            <li>
              <Link  className="text-s" to={!localStorage.getItem('token')? "/login":"/"}>{!localStorage.getItem('token')? "Login": "Profile"}</Link>
            </li>
            <li>
              <button className="navbtn"><Link className="text-sz"  to={!localStorage.getItem('token')? "/register":"/"}>{!localStorage.getItem('token')? "Register": "Log out"}</Link></button>
            </li>
          </ul>
        </nav>
      </div>
  );
}
export default Navbar;
