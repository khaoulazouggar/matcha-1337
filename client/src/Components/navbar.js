import React, { useEffect, useState } from "react";
// import {a} from "react-router-dom";
import "../css/navbar.css";
import lo1 from "../photos/speech.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const click = () =>{
    setToken("")
    if (token) localStorage.removeItem("token")
    else (setToken("")) 
    history.push("/")
  }
  return (
    <div className="navigation">
      <Link to="/">
        <img alt="" className="lo1" src={lo1} />
      </Link>

      <div className="brand">
        <Link className="text-s" to="/">
          Matcha
        </Link>
      </div>
      <nav>
        <div className="nav-mobile">
          <Link id="nav-hrefggle" to="#!">
            <span></span>
          </Link>
        </div>
        <ul className="nav-list">
          <li>
            <Link className="text-s" to={!token ? "/about" : "/edit"}>
              {!token ? "About" : "Edit"}
            </Link>
          </li>
          <li>
            <Link className="text-s" to={!token ? "/login" : "/profile"}>
              {!token ? "Login" : "Profile"}
            </Link>
          </li>
          <li>
            <button className="navbtn" onClick={() => click()}>
              <Link className="text-sz" to={!token ? "/register" : "/"}>
                {!token ? "Register" : "Log out"}
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
