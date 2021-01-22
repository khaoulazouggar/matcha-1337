import React, { useState } from "react";
import "../../css/edit.css";
import EditInfo from "./edit-info";
import EditProfile from "./edit-profile";
import EditPass from "./edit-password";
import { Upload } from "react-feather";
import { Edit2 } from "react-feather";
import { Key } from "react-feather";
import { User } from "react-feather";

function Edit() {
  const [Right, setRight] = useState(1);
  const [Img, setImg] = useState([]);
  const onDrop = (e, picture) => {
    let data = URL.createObjectURL(picture[0]);
    setImg([data, Img]);
    e.target.value = "";
  };
  return (
    <div className="box-form">
      <div className="left-edit">
        <div style={Img[0] ? { border: "none" } : {}} className="edit-pic">
          <input
            className="file"
            type="file"
            accept="image/*"
            onChange={(e) => onDrop(e, e.target.files)}
          />
          <div style={Img[0] ? { display: "none" } : {}} className="drag-text">
            <Upload style={{ paddingTop: "50px" }} size={40} />
            <h3> Edit your profile's picture</h3>
          </div>

          <img
            className="editImg"
            style={Img[0] ? {} : { display: "none" }}
            src={Img[0]}
            alt={Img}
            key={Img}
          />
        </div>
        <div className="edit">
          <span
            className="edit-child"
            onClick={() => setRight(1)}
            style={Right === 1 ? { color: "#7971b8" } : {}}
          >
            <Edit2
              style={
                Right === 1
                  ? { color: "#7971b8", marginRight: "10px" }
                  : { marginRight: "10px" }
              }
            />
            Edit your information
          </span>
          <br /> <br />
          <span
            className="edit-child"
            onClick={() => setRight(2)}
            style={Right === 2 ? { color: "#7971b8" } : {}}
          >
            <User
              style={
                Right === 2
                  ? { color: "#7971b8", marginRight: "10px" }
                  : { marginRight: "10px" }
              }
            />
            Edit your profile
          </span>
          <br /> <br />
          <span
            className="edit-child"
            onClick={() => setRight(3)}
            style={Right === 3 ? { color: "#7971b8" } : {}}
          >
            <Key
              style={
                Right === 3
                  ? { color: "#7971b8", marginRight: "10px" }
                  : { marginRight: "10px" }
              }
            />
            Change your password
          </span>
        </div>
      </div>
      <div className="editRight" style={{ height: "850px" }}>
        {Right === 1 ? (
          <EditInfo />
        ) : Right === 2 ? (
          <EditProfile />
        ) : (
          <EditPass />
        )}
      </div>
    </div>
  );
}
export default Edit;
