import React, { useEffect, useState } from "react";
// import {a} from "react-router-dom";
import "../css/navbar.css";
import lo1 from "../photos/speech.png";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const history = useHistory();
  const [token, setToken] = useState("");
  const [userlogged, setuserlogged] = useState("");

  useEffect(() => {
    let unmount = false
    if(!unmount){
      setToken(localStorage.getItem("token"));
      axios
        .get("http://localhost:3001/getusername", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            setuserlogged(res.data);
            // console.log(res.data);
          }
        }); 
    }
    return () => {
      unmount = true
    }// eslint-disable-next-line
  }, [token]);
  const click = () => {
    setToken("");
    if (token) {
      localStorage.removeItem("token");
      history.push("/");
    } else setToken("");
  };
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
            <NavLink className="text-s" to={!token ? "/login" : `/profile/${userlogged}`}>
              {!token ? "Login" : "Profile"}
            </NavLink>
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
