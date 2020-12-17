import React, { useState } from "react";
import "../css/steps.css";
import hc from "../photos/hc.png";
import write from "../photos/write.svg";
import list from "../photos/Checklist.gif";
import { ArrowRight } from "react-feather";
import { ArrowLeft } from "react-feather";
import InStep from "./instep";
import upload from "../photos/upload.svg"
let handleImg = (nbrStep) => {
  let srcImg;
  if (nbrStep === 0  )
    srcImg = hc
  else if (nbrStep === 1)
    srcImg = write
  else if (nbrStep === 2)
    srcImg = list
  else
    srcImg = upload
return srcImg
}
function Steps() {
  const [inStep1, setInStep] = useState(0);
  return (
    <div className="steps">
      <div className="progressbar">
        <div>1</div>
        <div style={inStep1 === 0 ? {background:"white"} : { background: "#646bfaad"}}></div>
        <div style={inStep1 === 0 ? {background:"white"} : { background: "#646bfaad", color:"white"}}>2</div>
        <div style={inStep1 === 0 || inStep1 === 1 ? {background:"white"} : { background: "#646bfaad"}}></div>
        <div style={inStep1 === 0 || inStep1 === 1 ? {background:"white"} : { background: "#646bfaad", color:"white"}}>3</div>
        <div style={inStep1 === 0 || inStep1 === 1 || inStep1 === 2 ? {background:"white"} : { background: "#646bfaad"}}></div>
        <div style={inStep1 === 0 || inStep1 === 1 || inStep1 === 2 ? {background:"white"} : { background: "#646bfaad", color:"white"}}>4</div>
      </div>
      <div className="all">
        <div className="step">
          <div className="instep">
            {inStep1 === 0  ? (<InStep />) : inStep1 === 1 ? (<textarea className="bio" type="text" placeholder="Add your Bio" />) : inStep1 === 2 ? ("step 3") : ("step 4")}
          </div>
          <div className="photo">
            {}
            <img alt="" src={handleImg(inStep1)} style={inStep1 === 0 ? {width: '275px'} : inStep1 === 1 ? { width: '380px', marginTop:'40px' } : {width : '310px'} }  />
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
              {" "}
              <ArrowLeft
                style={{ marginRight: 9, display: "flex", float: "left", marginTop: 2 }}
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
              setInStep(inStep1 === 3 ? inStep1 : inStep1 + 1);
            }}
          >
            Next <ArrowRight style={{ display: "flex", float: "right", marginTop: 2 }} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Steps;
