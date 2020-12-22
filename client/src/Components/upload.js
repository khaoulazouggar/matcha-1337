import React, { useState } from "react";
import "../css/upload.css";

function Upload(props) {
  const onDrop = (e, picture) => {
    console.log('loj')
    let data = URL.createObjectURL(picture[0]);
    props.data.setImg([data, ...props.data.img]);
    e.target.value = "";
  };
  return (
    <div className="upload">
      <div className="file-upload">
        <div className="image-upload-wrap">
          <input className="file-upload-input" type="file" accept="image/*" onChange={(e) => onDrop(e, e.target.files)} />
          <div className="drag-text">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>
        {/* {props.data.img.map((p) => (
          <img className="file-upload-image" src={p} alt={p} key={p} />
        ))}    */}
      </div>
    </div>
  );
}
export default Upload;
