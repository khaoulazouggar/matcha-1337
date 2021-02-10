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
import Alert from "./alert";
import { Trash2 } from "react-feather";
import { User } from "react-feather";

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
  const [gender, setGender] = useState({ yourGender: "", genderLooking: "" });
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);

  const handleRemoveItem = (e) => {
    // console.log(e);
    setImg(img.filter((item, i) => i !== e));
  };

  const history = useHistory();
  const routeChange = () => {
    let path = "/";
    history.push(path);
  };
  const [inStep1, setInStep] = useState(0);
  useEffect(() => {
    props.changeColor("#f6f6f6"); // eslint-disable-next-line
  }, []);
  return (
    <div className="steps">
      <div className="progressbar">
        <div onClick={() => setInStep(0)} style={{ background: "#646bfaad", color: "white" }}>
          1
        </div>
        <div style={inStep1 === 0 ? { background: "white" } : { background: "#646bfaad" }}></div>
        <div onClick={() => setInStep(1)} style={inStep1 === 0 ? { background: "" } : { background: "#646bfaad", color: "white" }}>
          2
        </div>
        <div style={inStep1 === 0 || inStep1 === 1 ? { background: "white" } : { background: "#646bfaad" }}></div>
        <div
          onClick={() => setInStep(2)}
          style={inStep1 === 0 || inStep1 === 1 ? { background: "" } : { background: "#646bfaad", color: "white" }}
        >
          3
        </div>
        <div style={inStep1 === 0 || inStep1 === 1 || inStep1 === 2 ? { background: "white" } : { background: "#646bfaad" }}></div>
        <div
          onClick={() => setInStep(3)}
          style={inStep1 === 0 || inStep1 === 1 || inStep1 === 2 ? { background: "" } : { background: "#646bfaad", color: "white" }}
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
              <textarea className="bio" type="text" placeholder="Add Your Bio" value={notes} onChange={(e) => setNotes(e.target.value)} />
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
                  <div style={{ width: "155px" }} className="test" key={i}>
                    <img className="file-upload-image" src={p} alt={p} />
                    <button className="remove-image" title="remove-image" onClick={() => handleRemoveItem(i)}>
                      <Trash2 size={20} />
                    </button>
                    <button className="default-image" title="default-image">
                      <User size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <img alt="" src={handleImg(inStep1)} style={inStep1 === 0 ? { width: "275px" } : { width: "350px" }} />
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
              <ArrowLeft style={{ marginRight: 9, display: "flex", float: "left", marginTop: 2 }} size={20} />
              Previous
            </button>
          ) : (
            ""
          )}
          <button
            className="next"
            onClick={() => {
              if (inStep1 === 3) {
                if (img.length <= 5 && img.length !== 0 && gender.yourGender && gender.genderLooking && notes && tags.length) routeChange();
                else {
                  Alert();
                }
              } else setInStep(inStep1 + 1);
            }}
          >
            {inStep1 === 3 ? "Finish" : "Next"} <ArrowRight style={{ display: "flex", float: "right", marginTop: 2 }} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Steps;
