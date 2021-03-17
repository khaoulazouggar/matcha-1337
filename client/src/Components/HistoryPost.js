import React from "react";
import noUser from "../photos/noUser.png";
import moment from "moment";
import { Link } from "react-router-dom";

export const HistoryPost = (props) => {
  return (
    <div className="inhistory">
      <div className="time">
        <div className="intime">
          <span className="last-time">{moment(props.post.date).fromNow()}</span>
        </div>
      </div>
      <div className="pic-profile">
        <div className="inpic-profile">
          <img
            className="inpic-profile-img"
            src={
              props.post.profilePic
                ? props.post.profilePic.substr(0, 5) === "https"
                  ? props.post.profilePic
                  : "http://localhost:3001/images/" + props.post.profilePic
                : noUser
            }
            alt="..."
          />
        </div>
      </div>
      <div className="data-info">
        <div className="indata-info">
          <span className="infoData">
            You viewed the profile of{" "}
            <Link to={"/profile/" + props.post.username} style={{ color: "#7871b8e6" }}>
              {props.post.username}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
