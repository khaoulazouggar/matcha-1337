import React, { useState } from "react";
import "../../css/edit.css";
import EditInfo from "./edit-info";
import EditProfile from "./edit-profile";
import EditPass from "./edit-password";
import EditGallery from "./edit-gallery";
import EditLocalisation from "./edit-localisation";
import Swal from "sweetalert2";
import axios from "axios";
import { Edit2 } from "react-feather";
import { Key } from "react-feather";
import { User } from "react-feather";
import { Aperture } from "react-feather";
import { MapPin } from "react-feather";
import { Trash2 } from "react-feather";
import noUser from "../../photos/noUser.png";
import { useHistory } from "react-router-dom";

function Edit(props) {
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [gender, setGender] = useState({ yourGender: "", genderLooking: "" });
  const [Right, setRight] = useState(1);
  const [delet, setdelet] = useState(0);
  const [ProfileImg, setProfileImg] = useState([noUser]);
  const history = useHistory();

  return (
    <div className="box-formE">
      <div className="editing">
        <div className="left-edit">
          <div style={ProfileImg[0] ? { border: "none" } : {}} className="edit-pic">
            <img className="editImg" style={ProfileImg[0] ? {} : { display: "none" }} src={ProfileImg} alt={ProfileImg} key={ProfileImg} />
          </div>
          <div className="edit">
            <span className="edit-child" onClick={() => setRight(1)} style={Right === 1 ? { color: "#7971b8" } : {}}>
              <Edit2 style={Right === 1 ? { color: "#7971b8", marginRight: "10px" } : { marginRight: "10px" }} />
              Edit your information
            </span>
            <br /> <br />
            <span className="edit-child" onClick={() => setRight(2)} style={Right === 2 ? { color: "#7971b8" } : {}}>
              <User style={Right === 2 ? { color: "#7971b8", marginRight: "10px" } : { marginRight: "10px" }} />
              Edit your profile
            </span>
            <br /> <br />
            <span className="edit-child" onClick={() => setRight(3)} style={Right === 3 ? { color: "#7971b8" } : {}}>
              <Key style={Right === 3 ? { color: "#7971b8", marginRight: "10px" } : { marginRight: "10px" }} />
              Change your password
            </span>
            <br /> <br />
            <span className="edit-child" onClick={() => setRight(4)} style={Right === 4 ? { color: "#7971b8" } : {}}>
              <Aperture style={Right === 4 ? { color: "#7971b8", marginRight: "10px" } : { marginRight: "10px" }} />
              Gallery
            </span>
            <br /> <br />
            <span className="edit-child" onClick={() => setRight(5)} style={Right === 5 ? { color: "#7971b8" } : {}}>
              <MapPin style={Right === 5 ? { color: "#7971b8", marginRight: "10px" } : { marginRight: "10px" }} />
              Localisation
            </span>
            <br /> <br />
            <span
              className="edit-child1"
              onClick={() => {
                setdelet(1);
                Swal.fire({
                  icon: "warning",
                  text: "Do you really want to delete your account ?",
                  confirmButtonText: `Delete`,
                  showCancelButton: true,
                  confirmButtonColor: "#cd4535",
                  heightAuto: false,
                  iconColor: "#cd4535",
                }).then((result) => {
                  if (result.isConfirmed) {
                    axios
                      .post(
                        "http://localhost:3001/deleteAccount",
                        {},
                        {
                          headers: {
                            "x-auth-token": localStorage.getItem("token"),
                          },
                        }
                      )
                      .then((res) => {
                        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
                          localStorage.removeItem("token");
                          history.push("/login");
                        } else {
                          localStorage.removeItem("token");
                          history.push("/register");
                          // console.log(res.data);
                        }
                      });
                    Swal.fire({
                      icon: "success",
                      text: "Your Account has been successfully deleted.",
                      showConfirmButton: false,
                      heightAuto: false,
                    });
                  } else if (result.isDismissed) {
                    setdelet(0);
                  }
                });
              }}
              style={delet === 1 ? { color: "#ce3535" } : {}}
            >
              <Trash2 style={delet === 1 ? { color: "#ce3535", marginRight: "10px" } : { marginRight: "10px" }} />
              DELETE YOUR ACCOUNT
            </span>
          </div>
        </div>
        <div className="editRight">
          {Right === 1 ? (
            <EditInfo data={{ ProfileImg, setProfileImg }} />
          ) : Right === 2 ? (
            <EditProfile data={{ gender, setGender }} data1={{ tags, setTags }} data2={{ notes, setNotes }} />
          ) : Right === 3 ? (
            <EditPass />
          ) : Right === 4 ? (
            <EditGallery data={{ ProfileImg, setProfileImg }} />
          ) : (
            <EditLocalisation />
          )}
        </div>
      </div>
    </div>
  );
}
export default Edit;
