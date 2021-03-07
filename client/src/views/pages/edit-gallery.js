import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Trash2 } from "react-feather";
import { User } from "react-feather";
import { Upload } from "react-feather";
import Swal from "sweetalert2";
import noUser from "../../photos/noUser.png";
import jimp from "jimp";

function EditGallery(props) {
  const [Img, setImg] = useState([]);
  const [img, setimg] = useState([]);
  const history = useHistory();

  const handelEditGallery = () => {
    // console.log("enter");
    axios
      .post(
        "http://localhost:3001/editGallery",
        {
          Img,
          img,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          if (res.data === "nothing changed") {
            Swal.fire({
              icon: "error",
              text: "Nothing Added",
              showConfirmButton: false,
              heightAuto: false,
            });
          } else if (res.data === "more than 5") {
            Swal.fire({
              icon: "error",
              text: "You added more than five pictures",
              showConfirmButton: false,
              heightAuto: false,
            });
          } else if (res.data === "updated") {
            Swal.fire({
              icon: "success",
              text: "Your picture has been successfully added.",
              showConfirmButton: false,
              heightAuto: false,
            });
            window.location.href = "/edit";
          }
        }
        // console.log(res.data);
      });
  };

  const handleRemoveItem = (e, image, auto) => {
    Swal.fire({
      icon: "warning",
      text: 'Do you really want to delete this picture ?',
      confirmButtonText: `Delete`,    
      showCancelButton: true,
      confirmButtonColor: "#cd4535",
      heightAuto: false,
      showLoaderOnConfirm: true,
      iconColor: "#cd4535",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(e);
        if(props.data.ProfileImg === "http://localhost:3001/images/" + Img[e].image){
          props.data.setProfileImg([noUser])
          axios
          .post(
            "http://localhost:3001/removeProfilePic",
            { Img,e },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (res.data === "U failed to authenticate" || res.data === "we need a token") {
              localStorage.removeItem("token");
              history.push("/login");
            } else {
              // console.log(res.data);
            }
          });
        }
        setImg(Img.filter((item, i) => i !== e));
        axios
          .post(
            "http://localhost:3001/removeimage",
            { auto, image },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (res.data === "U failed to authenticate" || res.data === "we need a token") {
              localStorage.removeItem("token");
              history.push("/login");
            } else {
              // console.log(res.data);
            }
          });
          Swal.fire({
            icon: "success",
            text: "Your picture has been successfully deleted.",
            showConfirmButton: false,
            heightAuto: false,
          });
      } 
    })
    
  };
  const handleDefaultItems = (e) => {
    // console.log("-----------", e, "---------", Img);
    props.data.setProfileImg("http://localhost:3001/images/" + Img[e].image);
    // console.log(props.data);

    axios
      .post(
        "http://localhost:3001/defaultimage",
        {Img,e},
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {if(res.data === "done"){
          // console.log(res.data);
          Swal.fire({
            icon: "success",
            text: "Your profile picture has been successfully modified.",
            showConfirmButton: false,
            heightAuto: false,
          });
        }
        }
      });
  };

  const handleRemoveItems = (e) => {
    // console.log(e);
    setimg(img.filter((item, i) => i !== e));
  };

  const handleFile = function () {
    const content = this.result;
    // setimg([content, ...img]);
    const base64Data = content ? content.replace(/^data:image\/\w+;base64,/, "") : "";
    const buffer = Buffer.from(base64Data, "base64");
    jimp.read(buffer, (err, rslt) => {
      if (!err) {
        // console.log("rslt");
        setimg([content, ...img]);
      }
    });
  };

  const onDrop = (e, file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(file[0]);
    e.target.value = "";
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
          // console.log(res.data);
        }
      });
  }, [history]);
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <div>
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
          {img.map((p, i) => (
            <div style={{ width: "227px", height: "227px" }} className="test" key={i}>
              <img className="gallery-img" src={p} alt={p} key={p} />
              <button
                className="remove-image"
                title="remove-image"
                onClick={() => handleRemoveItems(i)}
              >
                <Trash2 size={20} />
              </button>
              {/* <button
                className="default-image"
                title="default-image"
                onClick={() => handleDefaultItems(i)}
              >
                <User size={20} />
              </button> */}
            </div>
          ))}
          {Img.map((p, i) => (
            <div style={{ width: "227px", height: "227px" }} className="test" key={i}>
              <img
                className="gallery-img"
                src={"http://localhost:3001/images/" + p.image}
                alt={p}
              />
              <button
                className="remove-image"
                title="remove-image"
                onClick={() => handleRemoveItem(i, p.image, p.auto)}
              >
                <Trash2 size={20} />
              </button>
              <button
                className="default-image"
                title="default-image"
                onClick={() => handleDefaultItems(i)}
              >
                <User size={20} />
              </button>
            </div>
          ))}
        </div>
        <br />
        <br />
        <div style={{ marginRight: "15px", height: "100px" }}>
          <button className="btn" onClick={() => handelEditGallery()}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditGallery;
