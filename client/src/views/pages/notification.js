import React, { useState, useEffect }  from 'react';
import "../../css/notification.css"
import axios from "axios";
import rihana from "../../photos/test.jpeg"
import { useHistory, Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import Swal from "sweetalert2";



function Notification (){
    const [notif, setNotif] = useState();
    const history = useHistory();
    function removeNotification(id)
    {
        axios.post('http://localhost:3001/removeNotificaion', {id : id})
        .then((response) => {
            if (response.data.status === true)
            {
              Swal.fire({
                icon: "success",
                text: "notification has ben deleted",
                showConfirmButton: false,
              });
              setNotif(notif?.filter(notification => notification.id !== id));
            }
            if (response.data.err === true)
            {
                console.log('error');
            }
        });
        console.log(id)
    }
      useEffect(() => {
    axios.get("http://localhost:3001/notification", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
      if (res.data === "U failed to authenticate" || res.data === "we need a token") {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        setNotif(res.data);
      }
    }); // eslint-disable-next-line
  }, []);
    return (
        <div className="notif">
            {
                notif?.map((notification, index) => (
                <div  className="stylenotif" key={index}>
                    <img
                        src={rihana}
                        alt="aa"
                    />
                    <h3>{notification?.from} is liked you</h3>
                    <p>{moment("2021-03-12T17:17:00.695Z").fromNow()}</p>
                    <Link to="/profile/karroch">viewd profile</Link>
                    <DeleteIcon className="delete"  onClick={() => removeNotification(notification?.id)}></DeleteIcon>
                </div>
           ))}
        </div>
    );
}
export default Notification;
