import React, { useEffect, useState } from "react";
import "../css/navbar.css";
import lo1 from "../photos/speech.png";
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { socketConn as socket } from 'tools/socket_con'

function Navbar() {
const history = useHistory();
const [token, setToken] = useState("");
const [userlogged, setuserlogged] = useState("");
const [anchorEl, setAnchorEl] = useState(null);
const [notifmsg, setNotifmsg] = useState(false);
const [notifcountmsg, setnotifCountmsg] = useState(0);
const [notif, setNotif] = useState(false);
const [notifcount, setnotifCount] = useState(0);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

useEffect(() => {
  socket.on('notification_message', function(username) {
      setNotifmsg(true);
      setnotifCountmsg((oldchat)=> oldchat + 1)
  })
  socket.on('notification_Like', function(username) {
    setNotif(true);
    setnotifCount((oldchat)=> oldchat + 1)
})
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
          history.push("/");
        } else {
          setuserlogged(res.data);
          socket.emit('userconnected', res.data)
        }
      });
  }
  return () => {
    unmount = true
  }// eslint-disable-next-line
}, []);
  function Notification (){
      history.push('/notification');
      setNotif(false);
      setnotifCount(0)
  }
  function Notificationmsg(){
    history.push('/chat');
    setNotifmsg(false);
    setnotifCountmsg(0)
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
        <ul className="nav-mobile">
        <li>
      {
      !token ? '' : 
        <Badge color={notif === true ? `secondary` : 'primary'}  badgeContent={notif === true ? notifcount : ''}><NotificationsIcon className="notification" onClick={Notification}>
        </NotificationsIcon></Badge>
        }
          </li>
          <li className="chat_icons">
            {!token ? '' :  <Badge color={notifmsg === true ? `secondary` : 'primary'}  badgeContent={notifmsg === true ? notifcountmsg : ''}>
            <svg className="notification" onClick={Notificationmsg}viewBox="0 0 28 28" alt=""  height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
            </Badge>
            }
          </li>
          {token ? 
          <li>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon></MenuIcon>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link className="notification" to={'/profile/' + userlogged}>Profile</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="notification"  to='/edit'>Edit</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="notification"  to='/research'>Research</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="notification"  to='/browsing'>Browsing</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="notification"  to='/history'>History</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="notification"  to='/unblock'>Blacklist</Link></MenuItem>
              <MenuItem onClick={() => click()}>Logout</MenuItem>
            </Menu>
            </li>
            :
            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon></MenuIcon>
              </Button>
              <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link className="text-s" to='/login'>Login</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="text-s"  to='register'>Register</Link></MenuItem>
            </Menu>
            </div>
            }
        </ul>
        <ul className="nav-list">
          <li>
      {
      !token ? '' : 
        <Badge color={notif === true ? `secondary` : 'primary'}  badgeContent={notif === true ? notifcount : ''}><NotificationsIcon className="notification" onClick={Notification}>
        </NotificationsIcon></Badge>
        }
          </li>
          <li className="chat_icons">
            {!token ? '' :  <div><svg className="notification" onClick={Notificationmsg}viewBox="0 0 28 28" alt=""  height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
            <Badge color={notifmsg === true ? `secondary` : 'primary'} className={notifmsg === true ? '' : 'disableicons'} badgeContent={notifmsg === true ? notifcountmsg : ''}> </Badge>
            </div>
            }
          </li>
          {token ?
          <div>
            <li>
                <Link to='/research' className="text-s" >Research</Link>
            </li>
            <li>
              <Link to='/browsing' className="text-s" >Browsing</Link>
            </li>
            <li>
              <Link to='/unblock' className="text-s" >Blacklist</Link>
            </li>
            <li>
              <Link to='/histroy' className="text-s" >History</Link>
            </li>
          </div>
          : ''
          }
          <li>
            <Link className="text-s" to={!token ? "/about" : "/edit"}>
              {!token ? "About" : "Edit"}
            </Link>
          </li>
          <li>
            <NavLink className="text-s" to={!token ? "/login" : '/profile/' + userlogged}>
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
