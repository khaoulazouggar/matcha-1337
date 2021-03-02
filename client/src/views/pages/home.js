import React, { useState , useEffect} from "react"
import "../../css/home.css"
import chat from "../../photos/home.svg"
import Button from '@material-ui/core/Button';
import {Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserFriends, faEye} from '@fortawesome/free-solid-svg-icons';
import countapi from 'countapi-js';
import axios from "axios";
import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:3001";
function Home() {
    const [visit, setVisits] = useState();
    const [subscribers, setSubscribers] = useState([]);
    useEffect( () => {
         countapi.visits().then((result) => {
            setVisits(result.value);
        });
        axios.get("http://localhost:3001/subscribers").then((res) => {
            setSubscribers(res.data);
          });
          const socket = socketIOClient(endpoint);
      },[]);
    return (
        <div className="center">
        <div className="home">
            <div className="started">
                <h3>
                </h3>
                <p>
                We are here to build emotion, connect people and create happy stories.Online dating sites are the way to go for people seeking love or to meet singles while they don’t know where to find them. There are lots of online dating sites available which makes it .
                </p>
            <Link to="/register">
                <Button
                    variant="contained"
                    color="primary"
                    >
                    Get started
                </Button>
            </Link>
            </div>
            <div className="image">
                <img 
                alt=""
                className="chat_image" 
                src={chat} />
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
                <h3>5</h3>
                <h3>Users Online</h3>
            </div>
            <div className="card">
            <FontAwesomeIcon icon={faEye} className="icons" />
                <h3>
                {visit}
                </h3>
                <h3>Total Visits</h3>
            </div>
            <div className="card">
            <FontAwesomeIcon icon={faUsers} className="icons" />
                <h3>10005</h3>
                <h3>Users Online</h3>
            </div>
        </div>
        </div>
    );
}
export default Home