import React,{useEffect} from "react";
import "../../css/profile.css";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
      if (res.data === "U failed to authenticate" || res.data === "we need a token") {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
      console.log(res.data)
      }
    });
  }, [history]);

  return (
    <div className="profile">
      <div className="p1">
        <div className="top">
          <div className="pic"></div>
          <br />
          <br />
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
          <p className="title">User Name</p>
        </div>
        <div className="info"> Information :</div>
      </div>
      <div className="p2">
        <div className="bioghraphie">Bioghraphie :</div>
        <div className="stickers">Tags :</div>
      </div>
      <div className="p3">Gallery :{/* <div className= "gallery"></div> */}</div>
    </div>
  );
}
export default Profile;
