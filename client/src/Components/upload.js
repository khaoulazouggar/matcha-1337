import React, { useState } from "react";
import "../css/upload.css";

function Upload(props) {
  const [photos, setPhotos] = useState([]);
  const onDrop = (picture) => {
  const prev = URL.createObjectURL(picture[0]);
    setPhotos([prev, ...photos]);
  };
  return (
    <div className="upload">
      <div className="file-upload">
        <div className="image-upload-wrap">
          <input className="file-upload-input" type="file" accept="image/*" onChange={(e) => onDrop(e.target.files)} />
          <div className="drag-text">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>
        {photos.map((p) => /*(<img className="file-upload-image" src={p} alt={p} key={p} />)*/
        { let data = props.data.img ;
          data = {p};
          props.data.setImg = {...data}
        }
        )}  
      </div>
    </div>
  );
}
export default Upload;