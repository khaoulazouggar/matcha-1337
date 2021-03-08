import React, { useEffect, useState } from "react";
// import {a} from "react-router-dom";
import "../css/navbar.css";
import lo1 from "../photos/speech.png";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import  socketIOClient  from "socket.io-client";


function Navbar() {
  const history = useHistory();
  const [token, setToken] = useState("");
  const [me, setMe] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios.get("http://localhost:3001/getusername", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
        } else {
                setMe(res.data)
      }
    });
  }, [token]);
  if (token)
  {
    const URL = "http://localhost:3001";
    const socket = socketIOClient(URL);
    socket.emit('userconnected', me)
    socket.on('dis', usrname =>{
    })
  }
  function Notification (){
   
  }
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
        {/* <div className="nav-mobile">
          <Link id="nav-hrefggle" to="#!">
            <span></span>
          </Link>
        </div> */}
        <ul className="nav-mobile">
          <li>
              {!token ? '' : <NotificationsIcon className="notification" onClick={Notification}> </NotificationsIcon>}
          </li>
          <li>
            {!token ? '' : <Link to={!token ? "" : "/chat"} className="notification">
              <ChatIcon >
              </ChatIcon>
            </Link>}
          </li>
          <MenuIcon/>
        </ul>
        <ul className="nav-list">
          <li>
      {!token ? '' : <NotificationsIcon className="notification" onClick={Notification}> {
         // socket.emit('user_online', );
      }</NotificationsIcon>}
          </li>
          <li>
            {!token ? '' : <Link to={!token ? "" : "/chat"} className="notification">
              <ChatIcon >
              </ChatIcon>
            </Link>}
          </li>
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
