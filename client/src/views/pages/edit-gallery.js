import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Trash2 } from "react-feather";
import { User } from "react-feather";
import { Upload } from "react-feather";

function EditGallery() {
  const [Img, setImg] = useState([]);
  const [img, setimg] = useState([]);

  const history = useHistory();

  const handleRemoveItem = (e) => {
    // console.log(e);
    setImg(Img.filter((item, i) => i !== e));
  };

  
  const handleFile = function () {
    const content = this.result;
    setimg([content, ...img]);
    console.log("file content", content);
  };

  const onDrop = (e, file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(file[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getImages", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          setImg(res.data);
        }
      });
  }, [history]);
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <div className="fileUpload">
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="image/*"
            onChange={(e) => onDrop(e, e.target.files)}
          />
          <div className="drag-text">
            <Upload style={{ paddingTop: "50px" }} size={40} />
            <h3> Drag And Drop At Most Five Images Here</h3>
          </div>
        </div>
      </div>
      
      <div className="gallery">
        {img.map((p) => (
          <img className="file-upload-image" src={p} alt={p} key={p} />
        ))}   
        {Img.map((p, i) => (
          <div style={{ width: "227px", height: "227px" }} className="test" key={i}>
            <img className="gallery-img" src={"http://localhost:3001/images/" + p.image} alt={p} />
            <button
              className="remove-image"
              title="remove-image"
              onClick={() => handleRemoveItem(i)}
            >
              <Trash2 size={20} />
            </button>
            <button className="default-image" title="default-image">
              <User size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EditGallery;
