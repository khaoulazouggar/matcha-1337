import React, { useState, useEffect } from "react";
import "../css/steps.css";
import hc from "../photos/hc.png";
import write from "../photos/write.gif";
import list from "../photos/Checklist.gif";
import { ArrowRight } from "react-feather";
import { ArrowLeft } from "react-feather";
import InStep from "./instep";
import upload from "../photos/upload.gif";
import Tag from "./tag";
import Uploader from "./upload";
import { useHistory } from "react-router-dom";
import { Trash2 } from "react-feather";
import { User } from "react-feather";
import axios from "axios";
import Swal from "sweetalert2";
import { split } from "lodash";

let handleImg = (nbrStep) => {
  let srcImg;
  if (nbrStep === 0) srcImg = hc;
  else if (nbrStep === 1) srcImg = write;
  else if (nbrStep === 2) srcImg = list;
  else srcImg = upload;
  return srcImg;
};
function Steps(props) {
  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState({
    yourGender: "",
    genderLooking: "",
    birthday: "",
  });
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [profileImg, setProfileImg] = useState([]);
  const history = useHistory();
  let [unmount, changeUnmount] = useState(false);

  const handleRemoveItem = (e) => {
    // console.log(e);
    if(profileImg != e){
      setImg(img.filter((item, i) => i !== e));
    }else{
      Swal.fire({
        icon: "error",
        text: "this picture was setted as a default profile image you have to change it then you can remove it",
        showConfirmButton: false,
        heightAuto: false,
      });
    }    
  };

  const handleDefaultItem = (e, image, auto) => {
    setProfileImg(e);
    Swal.fire({
      icon: "success",
      text: "You set this picture as a default profile",
      showConfirmButton: false,
      heightAuto: false,
    });
    console.log(e);
    console.log(img[e]);
  };

  const [inStep1, setInStep] = useState(0);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
      // console.log("Latitude is :", crd.latitude);
      // console.log("Longitude is :", crd.longitude);
      position.latitude = crd.latitude;
      position.longitude = crd.longitude;
      setPosition({ ...position });
      axios.get(`https://ipinfo.io/json?token=ba47e2018ae9e4`).then((res) => {
        if (!unmount) {
          setCity(res.data.city);
        }
        // console.log(res.data.city);
      });
    }

    function errors(err) {
      // console.warn(`ERROR(${err.code}): ${err.message}`);
      axios.get(`https://ipinfo.io/json?token=ba47e2018ae9e4`).then((res) => {
        if (!unmount) {
          const position = split(res.data.loc, ",");
          position.latitude = position[0];
          position.longitude = position[1];
          setPosition({ ...position });
          setCity(res.data.city);
          // console.log(res.data.city);
        }
      });
    }
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (!unmount) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
          if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
        }
      });
    return () => {
      changeUnmount(true);
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getposition", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (!unmount) {
          if (
            res.data === "U failed to authenticate" ||
            res.data === "we need a token"
          ) {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            if (res.data[0].latitude) {
              history.push("/");
              // console.log(res.data[0].latitude);
            }
          }
        }
      });
    return () => {
      changeUnmount(true);
    }; // eslint-disable-next-line
  }, []);

  const handelSteps = () => {
    axios
      .post(
        "http://localhost:3001/steps",
        {
          ...position,
          ...gender,
          notes,
          img,
          tags,
          profileImg,
          city,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (
          res.data === "U failed to authenticate" ||
          res.data === "we need a token"
        ) {
          localStorage.removeItem("token");
          history.push("/login");
        } else if (res.data === "data too long") {
          Swal.fire({
            icon: "error",
            text: "data in bio or tags is too long",
            showConfirmButton: false,
            heightAuto: false,
          });
          console.log(res.data);
        } else if (res.data === "done") {
          Swal.fire({
            icon: "success",
            text: "Your profile have been successfully completed",
            showConfirmButton: false,
            heightAuto: false,
          });
          history.push("/");
        } else if (res.data === "Please enter a valid birthday") {
          Swal.fire({
            icon: "error",
            text: "Please enter a valid birthday",
            showConfirmButton: false,
            heightAuto: false,
          });
        } else if (res.data === "You have to complete all the steps first!") {
          Swal.fire({
            icon: "error",
            text: "You have to complete all the steps first!",
            showConfirmButton: false,
            heightAuto: false,
          });
        }
      });
  };
  return (
    <div className="steps">
      <div className="progressbar">
        <div
          onClick={() => setInStep(0)}
          style={{ background: "#646bfaad", color: "white" }}
        >
          1
        </div>
        <div
          style={
            inStep1 === 0
              ? { background: "white" }
              : { background: "#646bfaad" }
          }
        ></div>
        <div
          onClick={() => setInStep(1)}
          style={
            inStep1 === 0
              ? { background: "" }
              : { background: "#646bfaad", color: "white" }
          }
        >
          2
        </div>
        <div
          style={
            inStep1 === 0 || inStep1 === 1
              ? { background: "white" }
              : { background: "#646bfaad" }
          }
        ></div>
        <div
          onClick={() => setInStep(2)}
          style={
            inStep1 === 0 || inStep1 === 1
              ? { background: "" }
              : { background: "#646bfaad", color: "white" }
          }
        >
          3
        </div>
        <div
          style={
            inStep1 === 0 || inStep1 === 1 || inStep1 === 2
              ? { background: "white" }
              : { background: "#646bfaad" }
          }
        ></div>
        <div
          onClick={() => setInStep(3)}
          style={
            inStep1 === 0 || inStep1 === 1 || inStep1 === 2
              ? { background: "" }
              : { background: "#646bfaad", color: "white" }
          }
        >
          4
        </div>
      </div>
      <div className="all">
        <div className="step">
          <div className="instep">
            {inStep1 === 0 ? (
              <InStep data={{ gender, setGender }} />
            ) : inStep1 === 1 ? (
              <textarea
                maxLength="100"
                className="bio"
                type="text"
                placeholder="Add Your Bio"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            ) : inStep1 === 2 ? (
              <Tag data={{ tags, setTags }} />
            ) : (
              <Uploader data={{ img, setImg }} />
            )}
          </div>
          <div className="photo">
            {inStep1 === 3 && img.length ? (
              <div className="upload-image">
                {img.map((p, i) => (
                  <div
                    style={{ width: "155px", height: "155px" }}
                    className="test"
                    key={i}
                  >
                    <img className="file-upload-image" src={p} alt={p} />
                    <button
                      className="remove-image"
                      title="remove-image"
                      onClick={() => handleRemoveItem(i)}
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      className="default-image"
                      title="default-image"
                      onClick={() => handleDefaultItem(i)}
                    >
                      <User size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <img alt="" className="image" src={handleImg(inStep1)} />
            )}
            {/* <img alt="" src={handleImg(inStep1)} style={inStep1 === 0 ? { width: "275px" } : { width: "350px" }} /> */}
          </div>
        </div>

        <div className="divv">
          {inStep1 !== 0 ? (
            <button
              className="previous"
              onClick={() => {
                setInStep(inStep1 - 1);
              }}
            >
              <ArrowLeft
                style={{
                  marginRight: 9,
                  display: "flex",
                  float: "left",
                  marginTop: 2,
                }}
                size={20}
              />
              Previous
            </button>
          ) : (
            ""
          )}
          <button
            className="next"
            onClick={() => {
              if (inStep1 === 3) {
                handelSteps();
              } else setInStep(inStep1 + 1);
            }}
          >
            {inStep1 === 3 ? "Finish" : "Next"}{" "}
            <ArrowRight
              style={{ display: "flex", float: "right", marginTop: 2 }}
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Steps;
