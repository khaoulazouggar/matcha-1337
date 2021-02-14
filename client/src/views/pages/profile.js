import React, { useEffect } from "react";
import "../../css/profile.css";
import Rating from "@material-ui/lab/Rating";

function Profile(props) {
  useEffect(() => {
    props.changeColor("#f6f6f6"); // eslint-disable-next-line
  }, []);
  return (
    <div className="profile">
      <div className="p1">
        <div className="top">
          <div className="pic"></div>
          <br/><br/>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
          <p className="title">User Name</p>
        </div>
        <div className="info"></div>
      </div>
      <div className="p2">
          <div className="bioghraphie"></div>
          <div className="stickers"></div>
      </div>
      <div className="p3">
          {/* <div className= "gallery"></div> */}
      </div>
    </div>
  );
}
export default Profile;
