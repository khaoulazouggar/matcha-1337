import React, { useState } from "react";
import "../css/upload.css";
import {Upload} from "react-feather"

function Uploader(props) {
  const onDrop = (e, picture) => {
    let data = URL.createObjectURL(picture[0]);
    props.data.setImg([data, ...props.data.img]);
    e.target.value = "";
  };
  return (
    <div className="upload">
      <div className="file-upload">
        <div className="image-upload-wrap">
          <input className="file-upload-input" type="file" accept="image/*" onChange={(e) => onDrop(e, e.target.files)} />
          <div className="drag-text"><Upload style={{paddingTop: "50px"}} size={40}/>
            <h3> Drag And Drop At Most Five Images Here</h3>
          </div>
        </div>
        {/* {props.data.img.map((p) => (
          <img className="file-upload-image" src={p} alt={p} key={p} />
        ))}    */}
      </div>
    </div>
  );
}
export default Uploader;
