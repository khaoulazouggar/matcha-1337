import React, { useState, useEffect } from "react";
import "../../css/home.css";
import chat from "../../photos/home.svg";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserFriends, faEye } from "@fortawesome/free-solid-svg-icons";
import countapi from "countapi-js";
import axios from "axios";
import { socketConn as socket } from "tools/socket_con";

// const URL = "http://localhost:3001";
// const socket = socketIOClient(URL);
function Home() {
  const [visit, setVisits] = useState();
  const [onlineUsers, setOnlineUsers] = useState();
  const [totalMatched, setTotalmatched] = useState([]);
  const [me, setMe] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  useEffect(() => {
    let unmount = false;
    countapi.visits().then((result) => {
      if (!unmount) setVisits(result.value);
    });
    axios.get("http://localhost:3001/subscribers").then((res) => {
      if (!unmount) setSubscribers(res.data);
    });
    axios.get("http://localhost:3001/totalMatched").then((res) => {
      if (!unmount) setTotalmatched(res.data);
    });
    axios
      .get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } })
      .then((res) => {
        if (!unmount) {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            setMe(false);
          } else {
            setMe(true);
          }
        }
      });
    return () => {
      unmount = true;
    };
  }, []);
  socket.emit("getUsersOnline", "true");
  socket.on("usersOnline", function (data) {
    //   console.log(data)
    setOnlineUsers(data);
  });
  return (
    <div className="center">
      <div className="home">
        <div className="started">
          <p>
            We are here to build emotion, connect people and create happy stories.Online dating sites are the way to go
            for people seeking love or to meet singles while they don’t know where to find them. There are lots of
            online dating sites available which makes it .
          </p>
          {me === false ? (
            <Link to="/register">
              <Button variant="contained" color="primary">
                Get started
              </Button>
            </Link>
          ) : (
            <Link to="/browsing">
              <Button variant="contained" color="primary">
                Find matching user
              </Button>
            </Link>
          )}
        </div>
        <div className="image">
          <img alt="" className="chat_image" src={chat} />
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <FontAwesomeIcon icon={faUsers} className="icons" />
          <h3>{subscribers[0]?.sub}</h3>
          <h3>Subscribers</h3>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faUserFriends} className="icons" />
          <h3>{onlineUsers}</h3>
          <h3>Users Online</h3>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faEye} className="icons" />
          <h3>{visit}</h3>
          <h3>Total Visits</h3>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faUsers} className="icons" />
          <h3>{totalMatched[0]?.matched}</h3>
          <h3>Total Matched</h3>
        </div>
      </div>
    </div>
  );
}
export default Home;
